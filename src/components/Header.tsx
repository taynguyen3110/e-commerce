import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import cartIcon from '../assets/icons/cart.png'
import profileIcon from '../assets/icons/profile.png'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PromotionBar } from './PromotionBar'

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
      {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
      <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
    </>
  )
}

const Header = () => {
  return (
    <div className='mx-auto'>
      <PromotionBar />
      <div className='container mx-auto nav-bar flex gap-10 justify-between text-center my-6'>
        <div className='flex gap-x-10'>
          <div className='nav-logo relative'>
            <p className='relative -top-1'>Shop.co</p>
          </div>
          <div className='nav-menu flex gap-6 h-12 items-center'>
            <div>
              <Popover className="group">
                <PopoverButton className="flex items-center gap-2">
                  Shop
                  <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
                </PopoverButton>
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel anchor="bottom" className="flex flex-col bg-background my-2 p-4 rounded">
                    <a href="/insights">Zara</a>
                    <a href="/automations">Calvine Klein</a>
                    <a href="/reports">Prada</a>
                  </PopoverPanel>
                </Transition>
              </Popover>
            </div>
            <div>On Sale</div>
            <div>New Arrivals</div>
            <div>Brands</div>
          </div>
        </div>
        <div className='flex gap-x-10'>
          <div className='flex-initial' style={{ width: 500 }}>
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
              showIcon={false}
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
          <div className='nav-btns flex items-center gap-3.5'>
            <img src={cartIcon} alt="Shopping Cart" />
            <img src={profileIcon} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header