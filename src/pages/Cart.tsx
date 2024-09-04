// import data from '../mock/cartItem.json'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import useDocumentTitle from '../shared/hooks/useDocumentTitle'
import { useNavigate } from 'react-router-dom'
import { getProductArr, getProductById, Product } from '../services/productServices'
import classNames from 'classnames'
import { CartItemComp } from '../components/CartItemComp'
import { useShoppingCart } from '../shared/context/ShoppingCartContext'
import { calSalePrice } from '../utils/calSalePrice'
import { syncCartToDB } from '../services/userServices'
import { useUserAuth } from '../shared/context/UserAuthContext'
import { notify } from '../utils/notify'

const Cart = () => {
  const [products, setProducts] = useState<Product[] | null[]>([])
  const { cartItems } = useShoppingCart()
  const { user, displayLogin } = useUserAuth()

  useEffect(() => {
    fetchProducts()
  }, [cartItems])

  useEffect(() => {
    if (user) {
      const saveCart = setTimeout(() => {
        syncCartToDB(user, cartItems);
      }, 1000);
      return () => clearTimeout(saveCart);
    }
  }, [cartItems])


  useDocumentTitle('Cart');

  const navigate = useNavigate()

  function calTotal() {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find(i => i!.id === cartItem.id)
      return product ? calSalePrice(product!) * cartItem.quantity + total : total
    }, 0)
  }

  async function fetchProducts() {
    const idArr = cartItems.map(i => i.id)
    const productsArr = await getProductArr(idArr)
    setProducts(productsArr)
  }

  const DISCOUNT = 20
  const total = products ? calTotal() : 0

  return (
    <div>
      <div className='container px-4 md:px-0'>
        <Breadcrumb cart={true} />
        <h3 className='text-3xl mb-5'>Your Cart</h3>
        <div className='lg:flex lg:items-start lg:gap-4'>
          <div className='lg:w-7/12 border rounded-2xl p-3 pb-0 flex flex-col gap-3'>
            {cartItems && cartItems.length > 0 ? cartItems.map(i => {
              const product = products.find(y => y?.id === i.id)
              if (product) {
                return (
                  <CartItemComp product={product} cartItem={i} />
                )
              }
            }) : <p>There are no item in your Shopping Cart!</p>}
          </div>
          <div className='lg:w-5/12 mt-3 lg:mt-0 p-4 border rounded-2xl'>
            <div className='flex flex-col gap-3'>
              <h4 className='text-xl font-bold'>Order Summary</h4>
              <div className='flex justify-between'>
                <p className={classNames('opacity-[99]')}>Subtotal</p>
                <span className='font-bold'>${total}</span>
              </div>
              <div className='flex justify-between'>
                <p className=''>Discount (-{DISCOUNT}%)</p>
                <span className='font-bold text-red-500'>-${Math.round(total * DISCOUNT / 100)}</span>
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
                <span className='font-bold text-xl'>${Math.round(total * (100 - DISCOUNT) / 100)}</span>
              </div>
              <div className='flex w-full gap-4'>
                <div className='relative w-8/12'>
                  <i className='bx bx-purchase-tag absolute top-1/2 translate-y-[-50%] left-4 text-xl opacity-40 font-bold' ></i>
                  <input type="text" className='md:py-4 py-3 pl-[43px] w-full bg-background rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base' placeholder='Add promo code' />
                </div>
                <button className='bg-black text-white rounded-full w-1/3 text-sm'>Apply</button>
              </div>
              <button className='bg-black text-white rounded-full w-full text-sm py-4' onClick={() => {
                if (user)
                  syncCartToDB(user, cartItems)
                else {
                  notify("warn", "Please Login to checkout.");
                  displayLogin()
                }
              }}>Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart
