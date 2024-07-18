import React from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import filerIcon from '../assets/icons/filter.png'

const CategoryPage = () => {
  return (
    <div>
      <div className='container px-4'>
        <hr />
        <Breadcrumb />

        <div className='hidden'>

        </div>
        <div className=''>
          <div className='flex items-baseline gap-2'>
            <h4 className='font-bold text-2xl'>Casual</h4>
            <p className='text-sm'>Showing 1-10 of 100 products <span className='hidden'>Sort by:
              <span className='opacity-100'><select>
                <option value="">Most Popular</option>
                <option value="">Most View</option>
                <option value="">Highest Rating</option>
              </select>
              </span>
            </span>
            </p>
            <img src={filerIcon} className='self-end ml-auto' alt="Filter Icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage