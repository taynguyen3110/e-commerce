import React, { useEffect, useMemo, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import filerIcon from '../assets/icons/filter.png'
import { Pagination } from '../components/Pagination'
import { ItemCard } from '../components/ItemCard';
import { getProductsRange, getProductsCount, getProductColors } from '../services/productServices';
import { FilterPanel } from '../components/FilterPanel';
import { Dropdown } from '../components/Dropdown';
import useMediaQuery from '../hooks/useMediaQuery';

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('')

  const isMobile = useMediaQuery('(max-width: 768px)')

  let PageSize = isMobile ? 6 : 9;

  const firstProductIndex = (currentPage - 1) * PageSize;
  const lastProductIndex = firstProductIndex + PageSize;

  const currentProductData = useMemo(() => {
    const data = getProductsRange(firstProductIndex, lastProductIndex);
    return data;

  }, [currentPage, isMobile]);

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  }

  return (
    <div>
      <div className='container px-4 sm:px-0'>
        <hr />
        <Breadcrumb />
        <div className='lg:flex lg:gap-3'>
          {(useMediaQuery('(min-width: 1028px)') || showFilterMenu) && <FilterPanel closeFilter={closeFilterMenu} />}
          {/* <div className='hidden '>
            <FilterPanel closeFilter={closeFilterMenu} />
          </div> */}
          <div className='lg:w-[75%]'>
            <div className='flex items-baseline justify-between gap-2'>
              <h4 className='font-bold text-2xl'>Casual</h4>
              <div className='flex-grow'>
                <p className='text-sm lg:text-right sm:mr-2'>Showing {firstProductIndex + 1}-{lastProductIndex} of {getProductsCount()} products
                  <span className='hidden sm:inline-block ml-3'>
                    <Dropdown trigger={<span>Sort by:<i className='bx bx-chevron-down'></i></span>}>
                      <div>Most Popular</div>
                      <div>Most Viewed</div>
                      <div>Highest Rating</div>
                    </Dropdown>
                  </span>
                </p>
              </div>
              <img src={filerIcon} className='self-end lg:hidden' onClick={() => setShowFilterMenu(true)} alt="Filter Icon" />
            </div>

            <div className='flex flex-wrap justify-between mt-6 mb-3 gap-3'>
              {currentProductData.map((product) => {
                return (
                  <ItemCard product={product} itemEachRows={isMobile ? 2 : 3} />
                )
              })}
            </div>
            <hr className='mb-3' />
            <Pagination
              currentPage={currentPage}
              totalCount={getProductsCount()}
              siblingCount={isMobile ? 0 : 1}
              pageSize={PageSize}
              onPageChange={(page: number | string) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage