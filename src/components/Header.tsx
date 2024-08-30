import React, { useState } from 'react'
import menuIcon from '../assets/icons/menu.png'
import searchIcon from '../assets/icons/search.png'
import { PromotionBar } from './PromotionBar'
import { Dropdown } from './Dropdown'
import { MobileMenu } from './MobileMenu'
import { SearchInput } from './SearchInput'
import { useShoppingCart } from '../shared/context/ShoppingCartContext'
import Login from './Login'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const { cartItems } = useShoppingCart()

  let scrollPosition = 0;

  function disableScroll() {
    scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }

  function enableScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  }

  const displayMenu = () => {
    setShowMenu(true)
    disableScroll()
  }

  const closeMenu = () => {
    setShowMenu(false)
    enableScroll()
  }

  const displayLogin = () => {
    setShowLogin(true)
    disableScroll()
  }

  const hideLogin = () => {
    setShowLogin(false)
    enableScroll()
  }

  return (
    <div className='mx-auto'>
      {showLogin && <Login hideLogin={hideLogin} />}
      <MobileMenu showMenu={showMenu} closeMenu={closeMenu} displayLogin={displayLogin} />
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
              <a className='' href='/cart'>
                <i className='bx bx-cart text-2xl font-bold z-20'></i>
              </a>
              <span className='absolute bottom-0 left-4 rounded-full text-white text-[10px] bg-red-600 z-30 w-[18px] h-[18px] pt-[2px]'>{cartItems.length}</span>
            </div>
            <i className='bx bx-user-circle text-2xl font-bold cursor-pointer'
              onClick={() =>
                displayLogin()
              }></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header