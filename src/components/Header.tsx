import React, { useState } from 'react'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import cartIcon from '../assets/icons/cart.png'
import profileIcon from '../assets/icons/profile.png'
import menuIcon from '../assets/icons/menu.png'
import searchIcon from '../assets/icons/search.png'
import { PromotionBar } from './PromotionBar'
import { Dropdown } from './Dropdown'
import { MobileMenu } from './MobileMenu'
import { SearchInput } from './SearchInput'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const closeMenu = () => {
    setShowMenu(false)
  }

  return (
    <div className='mx-auto'>
      <MobileMenu showMenu={showMenu} closeMenu={closeMenu} />
      <PromotionBar />
      <div className='container md:mx-auto md:px-0 px-4 nav-bar flex md:gap-10 justify-between text-center my-4'>
        <div className='flex lg:gap-10 md:gap-6 items-center md:w-2/3'>
          <img className='md:hidden cursor-pointer' src={menuIcon} onClick={() => setShowMenu(true)} alt="" />
          <div className='nav-logo relative'>
            <p className='relative md:-top-1 md:text-[32px] -top-[2px] text-2xl md:ml-0 ml-4'><a href='/'>Shop.co</a></p>
          </div>
          <div className='nav-menu lg:gap-6 gap-4 h-12 justify-stretch items-center md:flex hidden'>
            <Dropdown trigger={<button>Shop</button>}>
            <div className='flex flex-col items-start'>
              <a href="">Calvin Klein</a>
              <a href="">Versace</a>
              <a href="">Gucci</a>
            </div>
            </Dropdown>
            <div className='text-nowrap'>On Sale</div>
            <div className='text-nowrap'>New Arrivals</div>
            <div>Brands</div>
          </div>
        </div>
        <div className='flex md:gap-x-10 md:w-2/3 w-1/2 justify-end items-center gap-3.5'>
          <div className='min-[480px]:hidden'>
            <Dropdown trigger={<img src={searchIcon} alt="" />} fullWidth={true} align='right' offset={88}>
              <SearchInput />
            </Dropdown>
          </div>
          <div className='min-[480px]:flex hidden'>
            <SearchInput />
          </div>
          <div className='nav-btns flex items-center justify-between gap-3'>
            <a className='' href='/cart'>
            <i className='bx bx-cart text-2xl font-bold'></i>
            </a>
            <i className='bx bx-user-circle text-2xl font-bold cursor-pointer'></i>
            {/* <img className='cursor-pointer' src={profileIcon} alt="Profile" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header