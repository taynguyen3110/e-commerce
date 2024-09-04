import React, { useState } from 'react'
import menuIcon from '../assets/icons/menu.png'
import searchIcon from '../assets/icons/search.png'
import { PromotionBar } from './PromotionBar'
import { Dropdown } from './Dropdown'
import { MobileMenu } from './MobileMenu'
import { SearchInput } from './SearchInput'
import { useShoppingCart } from '../shared/context/ShoppingCartContext'
import Login from './Login'
import { useUserAuth } from '../shared/context/UserAuthContext'
import { disableScroll, enableScroll } from '../utils/toogleScroll'
import { motion } from 'framer-motion'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { cartItems, clearCart } = useShoppingCart()
  const { user, signOut, showLogin, showCreateAcc, displayLogin, displayCreateAcc, hideLogin } = useUserAuth()

  const displayMenu = () => {
    setShowMenu(true)
    disableScroll()
  }

  const closeMenu = () => {
    setShowMenu(false)
    enableScroll()
  }

  return (
    <div className='mx-auto'>
      {showLogin && <Login hideLogin={hideLogin} createAcc={showCreateAcc} />}
      <MobileMenu showMenu={showMenu} closeMenu={closeMenu} displayLogin={displayLogin} displayCreateAcc={displayCreateAcc} />
      <PromotionBar />
      <div className='container md:mx-auto md:px-0 px-4 nav-bar flex md:gap-10 justify-between text-center my-4'>
        <div className='flex lg:gap-10 md:gap-6 items-center md:w-2/3'>
          <img className='md:hidden cursor-pointer' src={menuIcon} onClick={() => displayMenu()} alt="" />
          <div className='nav-logo relative'>
            <p className='relative md:-top-1 md:text-[32px] -top-[2px] text-2xl md:ml-0 ml-4'><a href='/'>Shop.co</a></p>
          </div>
          <div className='nav-menu lg:gap-6 gap-4 h-12 justify-stretch items-center md:flex hidden'>
            <Dropdown trigger={<button>Shop</button>}>
              <div className='flex flex-col items-start w-40 z-50'>
                <a className='w-full py-3 hover:bg-bghighlight hover:text-highlight bg-white rounded-md' href="/category/Calvin Klein">Calvin Klein</a>
                <a className='w-full py-3 hover:bg-bghighlight hover:text-highlight bg-white rounded-md' href="/category/Versace">Versace</a>
                <a className='w-full py-3 hover:bg-bghighlight hover:text-highlight bg-white rounded-md' href="/category/Gucci">Gucci</a>
              </div>
            </Dropdown>
            <div className='text-nowrap'><a href='/category/On Sale'>On Sale</a></div>
            <div className='text-nowrap'><a href='/category/New Arrivals'>New Arrivals</a></div>
            <div className=''><a href='/category/Brands'>Brands</a></div>
          </div>
        </div>
        <div className='flex md:gap-x-10 lg:w-full md:w-2/3 w-1/2 justify-end items-center gap-3.5'>
          <div className='min-[480px]:hidden'>
            <Dropdown trigger={<img src={searchIcon} alt="" />} fullWidth={true} align='right' offset={88}>
              <SearchInput />
            </Dropdown>
          </div>
          <div className='min-[480px]:flex lg:grow lg:max-w-none max-w-96 hidden'>
            <SearchInput />
          </div>
          <div className='nav-btns flex items-center justify-between gap-3'>
            <div className='relative'>
              <a className='cursor-pointer' href='/cart'>
                <i className='bx bx-cart text-2xl font-bold z-20'></i>
                <span className='absolute bottom-0 left-4 rounded-full text-white text-[10px] bg-red-600 z-30 w-[18px] h-[18px] pt-[2px]'>{cartItems.length}</span>
              </a>
            </div>
            {!user ?
              <i className='bx bx-user-circle text-2xl font-bold cursor-pointer'
                onClick={() => {
                  displayLogin()
                }}></i>
              :
              <Dropdown trigger={user.photoURL ? <img className='rounded-full w-9' src={user.photoURL} alt='profile picture' /> : <i className='bx bx-user-circle text-2xl font-bold cursor-pointer'></i>} align='right'>
                <motion.div style={{ x: 20 }} animate={{ x: 0 }} className='mix-w-52 p-4'>
                  <h3>PROFILE</h3>
                  <hr className='my-3' />
                  <div className='flex flex-col items-start text-nowrap text-sm gap-1'>
                    <span>Email: <p className='inline'>{user.email}</p></span>
                    <span>Joined at: <p className='inline'>{user.metadata.creationTime}</p></span>
                    <span>Last Login: <p className='inline'>{user.metadata.lastSignInTime}</p></span>
                  </div>
                  <hr className='my-3' />
                  <button className='py-2 md:py-3 mt-2 w-4/5 sm:py-4 bg-black text-sm sm:text-base text-white rounded-full' onClick={() => {
                    clearCart()
                    signOut()
                  }
                  }>Log Out</button>
                </motion.div>
              </Dropdown>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header