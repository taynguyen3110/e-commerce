import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: React.ReactNode
}

type ShoppingCartContext = {
    // getItemQuantity: (id: string, size: string, color: string) => number
    increaseQuantity: (id: string, size: string, color: string, quantity?: number) => void
    decreaseQuantity: (id: string, size: string, color: string) => void
    removeFromCart: (id: string, size: string, color: string) => void
}

type CartItem = {
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

    // function getItemQuantity(id: string, size: string, color: string) {
    //     return 1
    // }
    function increaseQuantity(id: string, size: string, color: string, quantity = 1) {
        setCartItems(currCart => {
            let existItem = currCart.findIndex((i) => i.id === id && i.color === color && i.size === size);
            if (existItem >= 0) {
                currCart[existItem].quantity += quantity
                return currCart
            } else {
                currCart.push({ id, color, size, quantity })
                return currCart
            }
        })
    }
    function decreaseQuantity(id: string, size: string, color: string) {
        setCartItems(currCart => {
            let existItem = currCart.findIndex((i) => i.id === id && i.color === color && i.size === size);
            if (existItem >= 0) {
                if (currCart[existItem].quantity === 1) {
                    currCart.splice(existItem, 1)
                } else {
                    currCart[existItem].quantity -= 1
                }
            }
            return currCart
        })
    }
    function removeFromCart(id: string, size: string, color: string) {
        setCartItems(currCart => {
            let existItem = currCart.findIndex((i) => i.id === id && i.color === color && i.size === size);
            if (existItem >= 0) {
                currCart.splice(existItem, 1)
            }
            return currCart
        })
    }

    return <ShoppingCartContext.Provider value={{ increaseQuantity, decreaseQuantity, removeFromCart }}>
        {children}
    </ShoppingCartContext.Provider>
}