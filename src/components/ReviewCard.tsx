import React from 'react'
import nineRate from '../assets/icons/4.5-star.png'
import verifiedIcon from '../assets/icons/verified.png'

export const ReviewCard = () => {
    return (
        <div className='max-w-[400px] h-60 flex flex-col gap-3 border rounded-2xl px-7 pt-6'>
            <div>
                <img src={nineRate} alt="" />
            </div>
            <div className='flex gap-1'>
                <p className='text-xl font-bold'>Sarah M.</p>
                <img src={verifiedIcon} alt="" />
            </div>
            <p className='opacity-60'>"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."</p>
        </div>
    )
}
