// import data from '../mock/cartItem.json'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { formatTitle } from '../utils/formatTitle'
import { QuantityButton } from '../components/QuantityButton'
import useDocumentTitle from '../shared/hooks/useDocumentTitle'
import { useNavigate } from 'react-router-dom'
import { addToCart, CartItem, getCart, removeByOne } from '../services/cartServices'
import { getProductbyId } from '../services/productServices'
import classNames from 'classnames'
import { CartItemComp } from '../components/CartItemComp'
import { useShoppingCart } from '../shared/context/ShoppingCartContext'

const Cart = () => {

  useDocumentTitle('Cart');
  const navigate = useNavigate()
  const { logCart, cartItems, fillCart } = useShoppingCart()

  // console.log(cart)
  // console.log(cart.length)

  // async function fetchCart() {
  //   try {
  //     const response = await fetch('https://run.mocky.io/v3/f6c22a01-1580-449a-a67e-12646462e5bb');
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`)
  //     }
  //     const responseData = await response.json()
  //     setCart(responseData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const totalPrice = cartItems.reduce((price, item) => {
    const product = getProductbyId(item.id);
    return product != undefined ? product.salePrice * item.quantity + price : price;
  }, 0);

  const DISCOUNT = 20

  return (
    <div>
      <div className='container px-4 md:px-0'>
        <Breadcrumb cart={true} />
        <h3 className='text-3xl mb-5'>Your Cart</h3>
        <div className='lg:flex lg:items-start lg:gap-4'>
          <div className='lg:w-7/12 border rounded-2xl p-3 pb-0 flex flex-col gap-3'>
            {cartItems && cartItems.length > 0 ? cartItems.map(i => {
              const product = getProductbyId(i.id)
              if (product) {
                return (
                  <CartItemComp product={product} cartItem={i} />
                )
              }
            }
            ) : <p>There are no item in your Shopping Cart!</p>}
          </div>
          <div className='lg:w-5/12 mt-3 lg:mt-0 p-4 border rounded-2xl'>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl font-bold'>Order Summary</h4>
              <div className='flex justify-between'>
                <p className={classNames('opacity-[99]')}>Subtotal</p>
                <span className='font-bold'>${totalPrice}</span>
              </div>
              <div className='flex justify-between'>
                <p className=''>Discount (-{DISCOUNT}%)</p>
                <span className='font-bold text-red-500'>-${Math.round(totalPrice * DISCOUNT / 100)}</span>
              </div>
              <div className='flex justify-between'>
                <p className=''>Delivery Fee</p>
                <span className='font-bold'>$15</span>
              </div>
            </div>
            <hr className='my-4' />
            <div className='flex flex-col gap-5'>
              <div className='flex justify-between'>
                <p className='opacity-100'>Total</p>
                <span className='font-bold text-xl'>${Math.round(totalPrice * (100 - DISCOUNT) / 100)}</span>
              </div>
              <div className='flex w-full gap-4'>
                <div className='relative w-8/12'>
                  <i className='bx bx-purchase-tag absolute top-1/2 translate-y-[-50%] left-4 text-xl opacity-40 font-bold' ></i>
                  <input type="text" className='md:py-4 py-3 pl-[43px] w-full bg-background rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base' placeholder='Add promo code' />
                </div>
                <button className='bg-black text-white rounded-full w-1/3 text-sm'>Apply</button>
              </div>



              {/* <button className='bg-black text-white rounded-full w-full text-sm py-4' onClick={logCart}>Log Cart</button>
              <button className='bg-black text-white rounded-full w-full text-sm py-4' onClick={fillCart}>Fill Cart</button> */}



              <button className='bg-black text-white rounded-full w-full text-sm py-4'>Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
