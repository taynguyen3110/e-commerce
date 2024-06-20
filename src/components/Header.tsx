import React from 'react'

const Header = () => {
  return (
    <div className='container mx-auto max-w-screen-2xl'>
      <div className='promote-bar'>Promotion</div>
      <div className='nav-bar flex justify-around text-center'>
        <div className='nav-logo'>
          <p className=''>Shop.co</p>
        </div>
        <div className='nav-menu'>
          <ul className='flex h-full items-center'>
            <li>Shop</li>
            <li>On Sale</li>
            <li>New Arrivals</li>
            <li>Brands</li>
          </ul>
        </div>
        <div className='nav-search'>
          <input type='text' placeholder='Search products...' />
          <button>Search</button>
        </div>
        <div className='nav-btns'>
          <a href="">shop</a>
          <a href="">user</a>
        </div>
      </div>
    </div>
  )
}

export default Header