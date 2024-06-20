import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import cartIcon from '../assets/icons/cart.png'
import profileIcon from '../assets/icons/profile.png'

type Item = {
  id: number;
  name: string;
}

const items = [
  {
    id: 0,
    name: 'Cobol'
  },
  {
    id: 1,
    name: 'JavaScript'
  },
  {
    id: 2,
    name: 'Basic'
  },
  {
    id: 3,
    name: 'PHP'
  },
  {
    id: 4,
    name: 'Java'
  }
]

const handleOnSearch = (string: String, results: Item[]) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
  console.log(string, results)
}

const handleOnHover = (result: Item) => {
  // the item hovered
  console.log(result)
}

const handleOnSelect = (item: Item) => {
  // the item selected
  console.log(item)
}

const handleOnFocus = () => {
  console.log('Focused')
}

const formatResult = (item: Item) => {
  return (
    <>
      <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
      <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
    </>
  )
}

const Header = () => {
  return (
    <div className='container mx-auto max-w-screen-2xl'>
      <div className='promote-bar'>
        <p className='text-center bg-black text-white text-xs/[38px]'>Sign up and get 20% off to your first order. <span className='underline font-medium'>Sign Up Now</span></p>
      </div>
      <div className='nav-bar flex gap-10 justify-center text-center mx-8 my-6'>
        <div className='nav-logo relative'>
          <p className='relative -top-1'>Shop.co</p>
        </div>
        <div className='nav-menu'>
          <ul className='flex gap-6 h-full items-center'>
            <li>Shop</li>
            <li>On Sale</li>
            <li>New Arrivals</li>
            <li>Brands</li>
          </ul>
        </div>
        <div className='nav-search'>
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete<Item>
              items={items}
              fuseOptions={{ keys: ["name", "description"] }}
              resultStringKeyName="name"
              inputDebounce={100}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              maxResults={5}
              placeholder="Search for products..."
              autoFocus
              styling={{
                backgroundColor: '#F0EEED',
                borderRadius: '20px',
                boxShadow: 'none',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                color: 'rgba(0, 0, 0, 0.4)',
              }}
              formatResult={formatResult}
            />
          </div>
        </div>
        <div className='nav-btns flex items-center gap-3.5'>
          <img src={cartIcon} alt="Shopping Cart" />
          <img src={profileIcon} alt="Profile" />
        </div>
      </div>
    </div>
  )
}

export default Header