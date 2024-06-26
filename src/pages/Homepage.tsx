import React from 'react'
import heroImg from '../assets/images/hero-img.png';
import starIcon from '../assets/icons/starIcon.png';

const Homepage = () => {
  return (
    <div className='h-[663px] bg-[#F2F0F1]'>
      <div className='container flex justify-between h-full gap-12'>
        <div className='w-1/2 flex-col'>
          <h1 className='text-6xl'>FIND CLOTHES THAT MATCH YOUR STYLE</h1>
          <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style</p>
          <button className=''>Shop Now</button>
          <div className='flex'>
            <div>
              <p>200+</p>
              <p>International Brands</p>
            </div>
            <div>l</div>
            <div>
              <p>2,000+</p>
              <p>High-Quality Products</p>
            </div>
            <div>l</div>
            <div>
              <p>30,000+</p>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className='w-1/2 overflow-hidden relative'>
          <img src={starIcon} className="absolute scale-50 translate-y-[290px] z-10" alt="" />
          <img src={starIcon} className="absolute overflow-visible translate-x-[635px] translate-y-[85px] z-10" alt="" />
          <img className='object-fit scale-[0.89] translate-x-11 translate-y-[-6.7rem] z-0' src={heroImg} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Homepage