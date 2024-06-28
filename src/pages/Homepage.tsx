import React from 'react'
import heroImg from '../assets/images/hero-img.png';
import starIcon from '../assets/icons/starIcon.png';
import versaceLogo from '../assets/logos/versace-logo.png';
import zaraLogo from '../assets/logos/zara-logo.png';
import gucciLogo from '../assets/logos/gucci-logo.png';
import pradaLogo from '../assets/logos/prada-logo.png';
import calvinKleinLogo from '../assets/logos/calvin-klein-logo.png';
import casualImg from '../assets/images/categories/casual.png';
import formalImg from '../assets/images/categories/formal.png';
import partyImg from '../assets/images/categories/party.png';
import gymImg from '../assets/images/categories/gym.png';
import { Suggestion } from '../components/Suggestion';

import { CarouselSection } from '../components/CarouselSection';


const Homepage = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <div className=' bg-[#F2F0F1]'>
        <div className='container h-[663px] flex justify-between gap-12'>
          <div className='w-1/2 flex flex-col gap-8 items-start justify-center'>
            <h1 className='text-6xl'>FIND CLOTHES THAT MATCH YOUR STYLE</h1>
            <p className='opacity-60'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style</p>
            <button className='px-16 py-[15px] bg-black text-white rounded-full'>Shop Now</button>
            <div className='flex justify-between w-full'>
              <div>
                <p className='text-[40px] font-bold'>200+</p>
                <p className='opacity-60'>International Brands</p>
              </div>
              <div className='border-l-2 border-black opacity-10'></div>
              <div>
                <p className='text-[40px] font-bold'>2,000+</p>
                <p className='opacity-60'>High-Quality Products</p>
              </div>
              <div className='border-l-2 border-black opacity-10'></div>
              <div>
                <p className='text-[40px] font-bold'>30,000+</p>
                <p className='opacity-60'>Happy Customers</p>
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

      {/* BREAK SECTION */}
      <div className='bg-black'>
        <div className='container h-[122px] flex justify-between items-center'>
          <img src={versaceLogo} alt="Logo of Versace" />
          <img src={zaraLogo} alt="Logo of Zara" />
          <img src={gucciLogo} alt="Logo of Gucci" />
          <img src={pradaLogo} alt="Logo of Prada" />
          <img src={calvinKleinLogo} alt="Logo of Calvin Klein" />
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div>
        <div className='container'>
          <Suggestion title="NEW ARRIVALS" />
          <hr />
        </div>
      </div>

      {/* TOP SELLING */}
      <div>
        <div className='container'>
          <Suggestion title="TOP SELLING" />
        </div>
      </div>

      {/* CATEGORIES */}
      <div className=''>
        <div className='container h-[866px] bg-background rounded-[50px]'>
          <h1 className='text-5xl pt-20 pb-16 text-center'>BROWSE BY DRESS STYLE</h1>
          <div className='mx-16 mb-20 flex flex-col gap-5'>
            <div className='flex gap-5 justify-stretch'>
              <div className='relative grow'>
                <p className='absolute top-8 left-10 text-3xl font-bold'>Casual</p>
                <img className='rounded-3xl object-cover object-top h-[289px] w-full' src={casualImg} alt="" />
              </div>
              <div className='relative grow'>
                <p className='absolute top-8 left-10 text-3xl font-bold'>Formal</p>
                <img className='rounded-3xl object-cover object-top h-[289px] w-full' src={formalImg} alt="" />
              </div>
            </div>
            <div className='flex gap-5 justify-stretch'>
              <div className='relative grow'>
                <p className='absolute top-8 left-10 text-3xl font-bold'>Party</p>
                <img className='rounded-3xl object-cover object-top h-[289px] w-full' src={partyImg} alt="" />
              </div>
              <div className='relative grow'>
                <p className='absolute top-8 left-10 text-3xl font-bold'>Gym</p>
                <img className='rounded-3xl object-cover object-top h-[289px] w-full' src={gymImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className='max-w-[1636px] flex flex-col mx-auto relative'>
        <div className='container'>
          <h1 className='text-5xl pt-24 pb-16'>OUR HAPPY CUSTOMERS</h1>
        </div>
        <div className='container relative'>
          <CarouselSection />
        </div>
      </div>
    </div>
  )
}

export default Homepage