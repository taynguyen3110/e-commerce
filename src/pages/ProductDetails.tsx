import React from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { Outlet } from 'react-router-dom'

const ProductDetails = () => {
  return (
    <div>
      <section className=''>
        <div className='container'>
          <hr />
          <Breadcrumb />
          Product
        </div>
      </section>


    </div>
  )
}

export default ProductDetails