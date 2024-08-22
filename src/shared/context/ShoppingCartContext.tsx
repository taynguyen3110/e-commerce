import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: React.ReactNode
}

type ShoppingCartContext = {
    increaseCartQuantity: (id: string, size: string, color: string, quantity?: number) => void
    decreaseCartQuantity: (id: string, size: string, color: string) => void
    removeFromCart: (id: string, size: string, color: string) => void
    logCart: () => CartItem[]
    cartItems: CartItem[]
    cartQuantity: number
    fillCart: () => void
}

export type CartItem = {
    id: string,
    color: string,
    size: string
    quantity: number,
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

    function increaseCartQuantity(id: string, size: string, color: string, quantity = 1) {
        setCartItems(
            currCart => {
                if (currCart.find(i => i.id === id && i.size === size && i.color === color) == null) {
                    return [...currCart, { id, size, color, quantity }]
                } else {
                    return currCart.map(i => {
                        if (i.id === id && i.size === size && i.color === color) {
                            return { ...i, quantity: i.quantity + quantity }
                        } else {
                            return i
                        }
                    })
                }
            }
        )
    }

    function decreaseCartQuantity(id: string, size: string, color: string) {
        setCartItems(
            currCart => {
                if (currCart.find(i => i.id === id && i.size === size && i.color === color)?.quantity === 1) {
                    return currCart.filter(i => i.id !== id || i.size !== size || i.color !== color)
                } else {
                    return currCart.map(i => {
                        if (i.id === id && i.size === size && i.color === color) {
                            return { ...i, quantity: i.quantity - 1 }
                        } else {
                            return i
                        }
                    })
                }
            }
        )
    }

    function fillCart() {
        setCartItems([{ "id": "2", "size": "S", "color": "navy", "quantity": 5 }, { "id": "2", "size": "M", "color": "navy", "quantity": 14 }, { "id": "2", "size": "L", "color": "navy", "quantity": 21 }, { "id": "2", "size": "L", "color": "bison", "quantity": 14 }, { "id": "2", "size": "M", "color": "bison", "quantity": 14 }, { "id": "2", "size": "S", "color": "bison", "quantity": 14 }])
    }

    function removeFromCart(id: string, size: string, color: string) {
        setCartItems(
            currCart => {
                return currCart.filter(i => i.id !== id || i.size !== size || i.color !== color)
            }
        )
    }

    function logCart() {
        console.log(cartItems)
        return cartItems
    }

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    return <ShoppingCartContext.Provider value={{ fillCart, cartQuantity, logCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems }}>
        {children}
    </ShoppingCartContext.Provider>
}