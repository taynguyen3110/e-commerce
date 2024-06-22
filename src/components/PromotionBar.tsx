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
                <div className='container flex text-white justify-between relative'>
                    <p className='text-center text-xs/[38px] w-full'>Sign up and get 20% off to your first order.<a><span className='underline font-medium'>Sign Up Now</span></a></p>
                    <i className='bx bx-x text-xl hover:cursor-pointer my-auto absolute right-0 top-[5px]' onClick={closePromotionBar}></i>
                </div>
            </div>
        )
    }
}
