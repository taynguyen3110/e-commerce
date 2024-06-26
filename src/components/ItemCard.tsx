import React from 'react'
import tShirtImg from '../assets/images/new-arrival/t-shirt-tape.png';
import nineRate from '../assets/icons/4.5-star.png';

export const ItemCard = () => {
    return (
        <div className='flex flex-col gap-[6px] w-[295px]'>
            <div className='mb-2 h-[298px]'>
                <img className='rounded-2xl' src={tShirtImg} alt="" />
            </div>
            <div>
                <p className='text-xl font-bold'>T-shirt with Tape Details</p>
            </div>
            <div>
                <img className='inline-block mr-3' src={nineRate} alt="" />
                <span>4.5/5</span>
            </div>
            <div>
                <div className='flex gap-[10px] text-2xl font-bold'>
                    <div>$240</div>
                    <div className='opacity-40 line-through'>$260</div>
                    <div className='text-xs flex items-center px-[14px] py-[6px] text-[#FF3333] bg-opacity-10 bg-[#FF3333] rounded-2xl'>-20%</div>
                </div>
            </div>
        </div>
    )
}
