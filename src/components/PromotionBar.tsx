import React, { useState } from 'react'

export const PromotionBar = () => {

    const [showPromotionBar, setShowPromotionBar] = useState(true);

    const closePromotionBar = () => {
        setShowPromotionBar(false);
    }

    if (!showPromotionBar) {
        return null;
    } else {
        return (
            <div className='promote-bar bg-black'>
                <div className='container flex text-white justify-between relative md:py-4 py-2 px-8'>
                    <p className='text-center text-xs md:font-normal font-thin w-full opacity-100'>Sign up and get 20% off to your first order. <a><span className='underline md:font-medium font-normal'>Sign Up Now</span></a></p>
                    <i className='bx bx-x text-xl hover:cursor-pointer my-auto absolute md:right-0 right-4 top-[50%] -translate-y-1/2' onClick={closePromotionBar}></i>
                </div>
            </div>
        )
    }
}
