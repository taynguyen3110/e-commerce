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
import { CarouselMobile } from '../components/CarouselMobile';


const Homepage = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <div className=' bg-[#F2F0F1]'>
        <div className='container md:h-[663px] md:flex-row px-4 flex flex-col justify-between md:gap-12 gap-5 overflow-hidden'>
          <div className='md:w-1/2 flex flex-col gap-4 items-start justify-center mt-8'>
            <h1 className='md:text-6xl text-4xl'>FIND CLOTHES THAT MATCH YOUR STYLE</h1>
            <p className='opacity-60 md:text-base text-sm'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style</p>
            <button className='px-[calc(50%-37px)] py-[15px] bg-black text-white rounded-full'>Shop Now</button>
            <div className='flex flex-wrap md:justify-between md:flex-nowrap justify-center w-full md:mt-0 mt-1'>
              <div>
                <p className='md:text-[40px] text-2xl font-bold'>200+</p>
                <p className='md:text-base text-mobile opacity-60'>International Brands</p>
              </div>
              <div className='border-l-2 border-black opacity-10 md:mx-0 mx-7'></div>
              <div>
                <p className='md:text-[40px] text-2xl font-bold'>2,000+</p>
                <p className='md:text-base text-mobile opacity-60'>High-Quality Products</p>
              </div>
              <div className='border-l-2 border-black opacity-10 md:block hidden'></div>
              <div className='md:mt-0 mt-3'>
                <p className='md:text-[40px] text-2xl font-bold'>30,000+</p>
                <p className='md:text-base text-mobile opacity-60'>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className='md:w-1/2 md:overflow-hidden overflow-y-clip h-[400px] relative'>
            <img src={starIcon} className="absolute md:scale-50 md:top-[50%] md:translate-y-[-50%] md:left-0 -left-5 scale-[40%] top-20 z-10" alt="" />
            <img src={starIcon} className="absolute md:right-0 md:top-20 md:scale-100 -right-3 scale-[65%] z-10" alt="" />
            <img className='md:object-fit md:scale-[0.89] md:translate-x-11 md:translate-y-[-6.7rem] md:block relative top-3 scale-125 z-0' src={heroImg} alt="" />
          </div>
        </div>
      </div>

      {/* BREAK SECTION */}
      <div className='bg-black py-11 md:px-0 px-4'>
        <div className='container flex md:flex-nowrap flex-wrap md:justify-between gap-4 justify-evenly items-center'>
          <img className='h-6' src={versaceLogo} alt="Logo of Versace" />
          <img className='h-6' src={zaraLogo} alt="Logo of Zara" />
          <img className='h-6' src={gucciLogo} alt="Logo of Gucci" />
          <img className='h-6' src={pradaLogo} alt="Logo of Prada" />
          <img className='h-6' src={calvinKleinLogo} alt="Logo of Calvin Klein" />
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
      <div className='md:px-0 px-4'>
        <div className='container bg-background md:rounded-[50px] rounded-3xl'>
          <h1 className='md:text-5xl text-3xl md:pt-20 md:pb-16 pt-10 pb-7 md:px-0 px-5 text-center'>BROWSE BY DRESS STYLE</h1>
          <div className='md:mx-16 mx-6 mb-20 pb-7 flex flex-col md:gap-5 gap-4'>
            <div className='flex md:flex-row flex-col md:gap-5 gap-4 justify-stretch'>
              <div className='relative grow'>
                <p className='absolute md:top-8 md:left-10 top-4 left-7 md:text-3xl text-2xl font-bold'>Casual</p>
                <img className='rounded-3xl object-cover object-top h-[190px] w-full' src={casualImg} alt="" />
              </div>
              <div className='relative grow'>
                <p className='absolute md:top-8 md:left-10 top-4 left-7 md:text-3xl text-2xl font-bold'>Formal</p>
                <img className='rounded-3xl object-cover object-top h-[190px] w-full' src={formalImg} alt="" />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:gap-5 gap-4 justify-stretch'>
              <div className='relative grow'>
                <p className='absolute md:top-8 md:left-10 top-4 left-7 md:text-3xl text-2xl font-bold'>Party</p>
                <img className='rounded-3xl object-cover object-top h-[190px] w-full' src={partyImg} alt="" />
              </div>
              <div className='relative grow'>
                <p className='absolute md:top-8 md:left-10 top-4 left-7 md:text-3xl text-2xl font-bold'>Gym</p>
                <img className='rounded-3xl object-cover object-top h-[190px] w-full' src={gymImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className='md:max-w-[1636px] flex flex-col mx-auto relative'>
        <div className='container px-4'>
          <h1 className='md:text-5xl text-3xl pt-24 pb-16'>OUR HAPPY CUSTOMERS</h1>
        </div>
        <div className='container relative md:block hidden'>
          <CarouselSection />
        </div>
        <div className='container relative md:hidden'>
          <CarouselMobile />
        </div>
      </div>
    </div>
  )
}

export default Homepage