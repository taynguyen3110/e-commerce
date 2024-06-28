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
      <div className='container relative bg-black rounded-3xl top-[102px]'>
        <div className='flex py-10 px-20'>
          <div className='flex items-center'>
            <h1 className='text-5xl text-white w-3/4'>STAY UP TO DATE ABOUT OUR LATEST OFFER</h1>
          </div>
          <div className='flex items-center w-1/3'>
            <form className='w-full'>
              <div className='relative'>
                <img className='absolute top-1/2 translate-y-[-50%] left-4' src={emailIcon} alt="" />
                <input type="text" className='py-4 pl-[50px] min-w-60 w-full rounded-full placeholder:text-left' placeholder='Enter your email address'></input>
              </div>
              <button className='bg-white py-4 mt-[14px] min-w-60 w-full rounded-full '>Subscribe to Newsletter</button>
            </form>
          </div>
        </div>
      </div>
      <div className='bg-background pt-[140px]'>
        <div className='container'>
          <div className='flex justify-between items-center mb-9'>
            <div className='max-w-[250px] flex flex-col gap-3'>
              <div className='nav-logo relative'>
                <p className='relative -top-1'>Shop.co</p>
              </div>
              <p className='opacity-60'>We have clothes that suits your style and which you're proud to wear. From women to men.</p>
              <div className='flex gap-3 mt-6'>
                <img src={twitterIcon} alt="" />
                <img src={facebookIcon} alt="" />
                <img src={instagramIcon} alt="" />
                <img src={githubIcon} alt="" />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='pb-2 font-medium tracking-[3px]'>COMPANY</h4>
              <p className='opacity-60'>About</p>
              <p className='opacity-60'>Features</p>
              <p className='opacity-60'>Works</p>
              <p className='opacity-60'>Career</p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='pb-2 font-medium tracking-[3px]'>HELP</h4>
              <p className='opacity-60'>Customer Support</p>
              <p className='opacity-60'>Delivery Details</p>
              <p className='opacity-60'>Terms & Conditions</p>
              <p className='opacity-60'>Privacy Policy</p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='pb-2 font-medium tracking-[3px]'>FAQ</h4>
              <p className='opacity-60'>Account</p>
              <p className='opacity-60'>Manage Deliveries</p>
              <p className='opacity-60'>Orders</p>
              <p className='opacity-60'>Payments</p>
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className='pb-2 font-medium tracking-[3px]'>RESOURCES</h4>
              <p className='opacity-60'>Free eBooks</p>
              <p className='opacity-60'>Development Tutorial</p>
              <p className='opacity-60'>How to - Blog</p>
              <p className='opacity-60'>Youtube Playlist</p>
            </div>
          </div>
          <hr className=''/>
          <div className='flex mt-4 justify-between items-center relative'>
            <div>
              <p className='opacity-60'>Shop.co &#169; 2000-2023, All Rights Reserved</p>
            </div>
            <div className='flex relative right-[-10px]'>
              <img src={visaIcon} alt="" />
              <img src={mastercardIcon} alt="" />
              <img src={paypalIcon} alt="" />
              <img src={applepayIcon} alt="" />
              <img src={googlepayIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer