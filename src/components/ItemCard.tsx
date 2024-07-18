import React from 'react'
import tShirtImg from '../assets/images/new-arrival/t-shirt-tape.png';
import nineRate from '../assets/icons/4.5-star.png';

export const ItemCard = () => {
    return (
        <div className='flex flex-col gap-[6px] w-5/12 mx-2 md:mb-0 mb-5'>
            <div className='mb-2'>
                <a href='/product'><img className='rounded-2xl max-h-96' src={tShirtImg} alt="" /></a>
            </div>
            <div>
                <a href='/product'><p className='lg:text-xl text-base font-bold'>T-shirt with Tape Details</p></a>
            </div>
            <div>
                <img className='inline-block mr-3' src={nineRate} alt="" />
                <span className='lg:text-sm text-xs'>4.5/5</span>
            </div>
            <div>
                <div className='flex items-center gap-[10px] lg:text-2xl text-xl font-bold'>
                    <div>$240</div>
                    <div className='opacity-40 line-through'>$260</div>
                    <div className='lg:text-xs text-[10px] flex items-center md:px-[14px] md:py-[6px] px-1 h-5 text-[#FF3333] bg-opacity-10 bg-[#FF3333] rounded-2xl'>-20%</div>
                </div>
            </div>
        </div>
    )
}
