import React, { useEffect, useMemo, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import filerIcon from '../assets/icons/filter.png'
import { Pagination } from '../components/Pagination'
import { ItemCard } from '../components/ItemCard';
import { getProductsRange, getProductsCount, Product } from '../services/productServices';
import { FilterPanel } from '../components/FilterPanel';
import { Dropdown } from '../components/Dropdown';
import useMediaQuery from '../shared/hooks/useMediaQuery';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../shared/hooks/useDocumentTitle';

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productData, setProductData] = useState<Product[]>([])
  const [productCount, setProductCount] = useState(0)
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState('')
  const { category } = useParams()

  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    fetchTotalProductCount()
  }, [])

  async function fetchTotalProductCount() {
    const count = await getProductsCount()
    setProductCount(count)
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage, isMobile])

  async function fetchProducts() {
    const data = await getProductsRange(firstProductIndex, lastProductIndex);
    setProductData(data);
  }

  category ? useDocumentTitle(category) : null

  let PageSize = isMobile ? 6 : 9;

  const firstProductIndex = (currentPage - 1) * PageSize;
  const lastProductIndex = firstProductIndex + PageSize;

  const closeFilterMenu = () => {
    setShowFilterMenu(false);
  }

  return (
    <div>
      <div className='container px-4 sm:px-0'>
        <hr />
        <Breadcrumb category={true} />
        <div className='lg:flex lg:gap-3'>
          {(useMediaQuery('(min-width: 1028px)') || showFilterMenu) && <FilterPanel closeFilter={closeFilterMenu} />}
          <div className='lg:w-[75%]'>
            <div className='flex items-baseline justify-between gap-2'>
              <h4 className='font-bold text-2xl'>{category}</h4>
              <div className='flex-grow'>
                <p className='text-sm lg:text-right sm:mr-2'>Showing {firstProductIndex + 1}-{lastProductIndex} of {productCount} products
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
              {productData.map((product) => {
                return (
                  <ItemCard key={product.id} product={product} itemEachRows={isMobile ? 2 : 3} />
                )
              })}
            </div>
            <hr className='mb-3' />
            <Pagination
              currentPage={currentPage}
              totalCount={productCount}
              siblingCount={isMobile ? 0 : 1}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage