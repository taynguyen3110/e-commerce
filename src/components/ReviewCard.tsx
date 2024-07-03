import React from 'react'
import nineRate from '../assets/icons/4.5-star.png'
import verifiedIcon from '../assets/icons/verified.png'

interface Props {
    name: string;
    review: string;
}

export const ReviewCard: React.FC<Props> = ({name, review}) => {
    return (
        <div className='min-h-60 flex flex-col gap-3 border rounded-2xl px-7 pt-6 mx-[10px]'>
            <div>
                <img src={nineRate} alt="" />
            </div>
            <div className='flex gap-1'>
                <p className='md:text-xl text-base font-bold'>{name}</p>
                <img src={verifiedIcon} alt="" />
            </div>
            <p className='md:text-base text-sm opacity-60 pb-5'>{review}</p>
        </div>
    )
}
