import React, { useEffect, useMemo, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import filerIcon from '../assets/icons/filter.png'
import { Pagination } from '../components/Pagination'
import { ItemCard } from '../components/ItemCard';
import { getProductsRange, getProductsCount } from '../services/productServices';
import { MobileFilter } from '../components/MobileFilter';

let PageSize = 6;


const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const firstProductIndex = (currentPage - 1) * PageSize;
  const lastProductIndex = firstProductIndex + PageSize;

  const currentProductData = useMemo(() => {
    const data = getProductsRange(firstProductIndex, lastProductIndex);
    console.log(data);
    return data;

  }, [currentPage]);

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  }

  return (
    <div>
      {showFilterMenu && <MobileFilter closeFilter={closeFilterMenu}/>}
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
            <img src={filerIcon} className='self-end ml-auto' onClick={() => setShowFilterMenu(true)} alt="Filter Icon" />
          </div>

          <div className='flex flex-wrap justify-between mt-6'>
            {currentProductData.map((product) => {
              return (
                <ItemCard product={product} />
              )
            })}
          </div>
          <hr className='mb-3' />
          <Pagination
            currentPage={currentPage}
            totalCount={getProductsCount()}
            siblingCount={1}
            pageSize={PageSize}
            onPageChange={(page: number | string) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage