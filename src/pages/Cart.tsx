// import data from '../mock/cartItem.json'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { formatTitle } from '../utils/formatTitle'
import { QuantityButton } from '../components/QuantityButton'

interface CartItem {
  id: string,
  name: string,
  imgSrc: string,
  size: string,
  color: string,
  quantity: number,
  price: number
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>()

  useEffect(() => {
    fetchCart()
  }, [])

  async function fetchCart() {
    try {
      const response = await fetch('https://run.mocky.io/v3/f6c22a01-1580-449a-a67e-12646462e5bb');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const responseData = await response.json()
      setCart(responseData)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div>
      <div className='container px-4 md:px-0'>
        <Breadcrumb cart={true}/>
        <h3 className='text-3xl mb-5'>Your Cart</h3>
        <div className='lg:flex lg:items-start lg:gap-4'>
          <div className='lg:w-7/12 border rounded-2xl p-3 pb-0 flex flex-col gap-3'>
            {cart && cart.map(i =>
            (
              <div className='cart-item flex gap-4 border-b pb-3'>
                <img className='h-24 rounded-lg' src={i.imgSrc} alt="Cart Item Image" />
                <div className='w-full h-24'>
                  <div className='flex justify-between items-center'>
                    <h4 className='font-bold w-4/5 truncate'>{i.name}</h4>
                    <i className='bx bxs-trash text-red-600 text-xl'></i>
                  </div>
                  <p className='opacity-100 text-xs'>Size: <span className='opacity-60'>{i.size}</span></p>
                  <p className='opacity-100 text-xs'>Color: <span className='opacity-60'>{formatTitle(i.color)}</span></p>
                  <div className='flex items-center justify-between'>
                    <p className='opacity-100 text-xl font-bold'>${i.price}</p>
                    <QuantityButton height={3} quantity={i.quantity} />
                  </div>
                </div>
              </div>
            )
            )}
          </div>
          <div className='lg:w-5/12 mt-3 lg:mt-0 p-4 border rounded-2xl'>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl font-bold'>Order Summary</h4>
              <div className='flex justify-between'>
                <p className=''>Subtotal</p>
                <span className='font-bold'>$565</span>
              </div>
              <div className='flex justify-between'>
                <p className=''>Discount (-20%)</p>
                <span className='font-bold text-red-500'>-$113</span>
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
                <span className='font-bold text-xl'>$467</span>
              </div>
              <div className='flex w-full gap-4'>
                <div className='relative w-8/12'>
                  <i className='bx bx-purchase-tag absolute top-1/2 translate-y-[-50%] left-4 text-xl opacity-40 font-bold' ></i>
                  <input type="text" className='md:py-4 py-3 pl-[43px] w-full bg-background rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base' placeholder='Add promo code' />
                </div>
                <button className='bg-black text-white rounded-full w-1/3 text-sm'>Apply</button>
              </div>
              <button className='bg-black text-white rounded-full w-full text-sm py-4'>Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
