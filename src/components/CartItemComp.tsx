import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { formatTitle } from '../utils/formatTitle'
import { addToCart, CartItem, removeByOne } from '../services/cartServices'
import { QuantityButton } from './QuantityButton'
import { ProductDetails } from '../services/productServices'

interface CartItemCompProps {
    product: ProductDetails,
    cartItem: CartItem,
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export const CartItemComp = ({ product, cartItem, cart, setCart }: CartItemCompProps) => {

    const navigate = useNavigate()

    function handleAddToCart() {
        addToCart(cartItem.id, cartItem.color, cartItem.size, 1)
        updateCartState(cartItem.id, cartItem.size, cartItem.color, 'add')
    }

    function handleRemoveByOne() {
        removeByOne(cartItem.id, cartItem.color, cartItem.size)
        updateCartState(cartItem.id, cartItem.size, cartItem.color, 'remove')
    }

    function updateCartState(id: string, size: string, color: string, operation: string) {
        let existCart = [...cart]
        let existItemIndex = existCart.findIndex(i => i.id === id && i.size === size && i.color === color)
        if (operation === 'add') {
            existCart[existItemIndex].quantity += 1
            setCart([...existCart])
        }
        if (operation === 'remove') {
            if (existCart[existItemIndex].quantity > 1) {
                existCart[existItemIndex].quantity -= 1
            } else {
                existCart.splice(existItemIndex, 1)
            }
            setCart([...existCart])
        }
        if (operation === 'delete') {
            existCart.splice(existItemIndex, 1)
            setCart([...existCart])
        }
    }

    return (
        <div className={classNames('cart-item flex gap-4 border-b pb-3')}>
            <img className='h-24 rounded-lg cursor-pointer' src={product.imageSrc[0]} onClick={() => { navigate(`/product/${cartItem.id}`) }} alt="Cart Item Image" />
            <div className='w-full h-24'>
                <div className='flex justify-between items-center'>
                    <h4 className='font-bold w-4/5 truncate cursor-pointer' onClick={() => { navigate(`/product/${cartItem.id}`) }}>{product.name}</h4>
                    <i className='bx bxs-trash text-red-600 text-xl'></i>
                </div>
                <p className='opacity-100 text-xs'>Size: <span className='opacity-60'>{cartItem.size}</span></p>
                <p className='opacity-100 text-xs'>Color: <span className='opacity-60'>{formatTitle(cartItem.color)}</span></p>
                <div className='flex items-center justify-between'>
                    <p className='opacity-100 text-xl font-bold'>${product.salePrice}</p>
                    <QuantityButton key={cartItem.id} height={3} quantity={cartItem.quantity} handleAdd={handleAddToCart} handleDecrease={handleRemoveByOne} />
                </div>
            </div>
        </div>
    )
}
