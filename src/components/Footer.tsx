import React from 'react'
import emailIcon from '../assets/icons/email.png';
import twitterIcon from '../assets/icons/twitter.png'
import facebookIcon from '../assets/icons/facebook.png'
import instagramIcon from '../assets/icons/instagram.png'
import githubIcon from '../assets/icons/github.png'
import visaIcon from '../assets/icons/visa.png'
import mastercardIcon from '../assets/icons/mastercard.png'
import paypalIcon from '../assets/icons/paypal.png'
import applepayIcon from '../assets/icons/applepay.png'
import googlepayIcon from '../assets/icons/googlepay.png'

const Footer = () => {
  return (
    <div className='relative'>
      <div className='container md:relative absolute md:top-[102px] -top-36 md:px-0 px-4'>
        <div className='bg-black rounded-3xl'>
          <div className='flex md:py-10 md:px-20 px-6 py-8 md:flex-row md:gap-0 gap-7 flex-col'>
            <div className='flex items-center'>
              <h1 className='md:text-5xl text-3xl text-white md:w-3/4'>STAY UP TO DATE ABOUT OUR LATEST OFFER</h1>
            </div>
            <div className='flex items-center md:w-1/3'>
              <form className='w-full'>
                <div className='relative'>
                  <img className='absolute top-1/2 translate-y-[-50%] left-4' src={emailIcon} alt="" />
                  <input type="text" className='md:py-4 py-3 pl-[50px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base' placeholder='Enter your email address'></input>
                </div>
                <button className='bg-white md:py-4 md:text-base text-sm py-3 mt-[14px] min-w-60 w-full rounded-full '>Subscribe to Newsletter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-background md:pt-[140px] md:mt-0 mt-48 pt-[200px] md:px-0 px-4 pb-16'>
        <div className='container'>
          <div className='flex md:justify-between md:flex-nowrap md:text-base text-sm items-center flex-wrap md:mb-9 mb-2'>
            <div className='md:max-w-[250px] flex flex-col md:gap-3 gap-2 md:mb-0 mb-6'>
              <div className='nav-logo relative'>
                <p className='relative md:text-4xl text-3xl -top-1'>Shop.co</p>
              </div>
              <p>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
              <div className='flex gap-3 md:mt-6 mt-3'>
                <img src={twitterIcon} alt="" />
                <img src={facebookIcon} alt="" />
                <img src={instagramIcon} alt="" />
                <img src={githubIcon} alt="" />
              </div>
            </div>
            <div className='flex flex-col gap-3 md:w-auto md:mb-0 mb-6 w-1/2'>
              <h4 className='pb-1 font-medium tracking-[3px]'>COMPANY</h4>
              <p>About</p>
              <p>Features</p>
              <p>Works</p>
              <p>Career</p>
            </div>
            <div className='flex flex-col gap-3 md:w-auto md:mb-0 mb-6 w-1/2'>
              <h4 className='pb-1 font-medium tracking-[3px]'>HELP</h4>
              <p>Customer Support</p>
              <p>Delivery Details</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
            </div>
            <div className='flex flex-col gap-3 md:w-auto md:mb-0 mb-6 w-1/2'>
              <h4 className='pb-1 font-medium tracking-[3px]'>FAQ</h4>
              <p>Account</p>
              <p>Manage Deliveries</p>
              <p>Orders</p>
              <p>Payments</p>
            </div>
            <div className='flex flex-col gap-3 md:w-auto md:mb-0 mb-6 w-1/2'>
              <h4 className='pb-1 font-medium tracking-[3px]'>RESOURCES</h4>
              <p>Free eBooks</p>
              <p>Development Tutorial</p>
              <p>How to - Blog</p>
              <p>Youtube Playlist</p>
            </div>
          </div>
          <hr className='' />
          <div className='flex mt-4 md:justify-between md:flex-row flex-col items-center relative overflow-hidden'>
            <div className='md:pb-0 pb-3 md:text-base text-sm'>
              <p>Shop.co &#169; 2000-2023, All Rights Reserved</p>
            </div>
            <div className='flex relative md:right-[-10px]'>
              <img className='md:h-auto h-10' src={visaIcon} alt="" />
              <img className='md:h-auto h-10' src={mastercardIcon} alt="" />
              <img className='md:h-auto h-10' src={paypalIcon} alt="" />
              <img className='md:h-auto h-10' src={applepayIcon} alt="" />
              <img className='md:h-auto h-10' src={googlepayIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer