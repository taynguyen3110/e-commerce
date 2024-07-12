import React from 'react'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import cartIcon from '../assets/icons/cart.png'
import profileIcon from '../assets/icons/profile.png'
import searchIcon from '../assets/icons/search.png'
import menuIcon from '../assets/icons/menu.png'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PromotionBar } from './PromotionBar'
import Downshift from 'downshift'

const items = [
  { value: 'apple' },
  { value: 'pear' },
  { value: 'orange' },
  { value: 'orange2' },
  { value: 'orange3' },
  { value: 'grape' },
  { value: 'banana' },
  { value: 'banana2' },
  { value: 'banana3' },
  { value: 'banana4' },
]

const Header = () => {
  return (
    <div className='mx-auto'>
      <PromotionBar />
      <div className='container md:mx-auto px-4 nav-bar flex md:gap-10 justify-between text-center my-4'>
        <div className='flex lg:gap-10 md:gap-6 items-center md:w-2/3'>
          <img className='md:hidden' src={menuIcon} alt="" />
          <div className='nav-logo relative'>
            <p className='relative md:-top-1 md:text-[32px] -top-[2px] text-2xl md:ml-0 ml-4'>Shop.co</p>
          </div>
          <div className='nav-menu lg:gap-6 gap-4 h-12 justify-stretch items-center md:flex hidden'>
            <div>
              <Popover className="group">
                <PopoverButton className="flex items-center lg:gap-2 gap-1">
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
            <div className='text-nowrap'>On Sale</div>
            <div className='text-nowrap'>New Arrivals</div>
            <div>Brands</div>
          </div>
        </div>
        <div className='flex md:gap-x-10 md:w-2/3 w-1/2 justify-end items-center gap-3.5'>
          <div className='min-[480px]:hidden'>
            <img src={searchIcon} alt="" />
          </div>
          <Downshift
            onChange={selection =>
              alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
            }
            itemToString={item => (item ? item.value : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
              getRootProps,
            }) => (
              <div className='min-[480px]:flex items-center justify-stretch relative hidden'>
                <label {...getLabelProps()}></label>
                <div className='w-full justify-end'
                  style={{ display: 'flex' }}
                  {...getRootProps({}, { suppressRefError: true })}
                >
                  <div className='w-full flex justify-end relative'>
                    <img className='absolute top-1/2 translate-y-[-50%] left-4 opacity-40' src={searchIcon} alt="" />
                    <input className='bg-background py-2 pl-[52px] w-full rounded-full md:placeholder:text-base placeholder:text-sm' placeholder='Search for products' {...getInputProps()} />
                  </div>
                </div>
                {isOpen
                  ? (
                    <ul className='absolute block top-12 w-full bg-slate-700 border rounded-b-2xl z-10' {...getMenuProps()}>
                      {isOpen
                        ? items
                          .filter(item => !inputValue || item.value.includes(inputValue))
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.value,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index ? 'green' : 'yellow',
                                  fontWeight: selectedItem === item ? 'bold' : 'normal',
                                },
                              })}
                            >
                              {item.value}
                            </li>
                          ))
                        : null}
                    </ul>
                  ) : null}
              </div>
            )}
          </Downshift>
          <div className='nav-btns flex items-center justify-end gap-3.5'>
            <img className='' src={cartIcon} alt="Shopping Cart" />
            <img className='' src={profileIcon} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header