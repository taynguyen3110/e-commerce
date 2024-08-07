import React from 'react'
import verifiedIcon from '../assets/icons/verified.png'
import { Review } from '../services/reviewService';
import { Rating } from './Rating';
import classNames from 'classnames';

interface ReviewCardProps {
    review: Review,
    carousel?: boolean
}

export const ReviewCard = ({ review, carousel = false }: ReviewCardProps) => {

    function formatDate(dateString: string) {
        const date = new Date(dateString)
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        return formatter.format(date)
    }

    return (
        <div className={classNames('flex flex-col gap-3 border rounded-2xl', { 'mx-[10px] md:min-h-60 pt-6 px-7': carousel, 'lg:min-h-56 pt-4 px-4' : !carousel })}>
            <div>
                <Rating rating={review.rating} />
            </div>
            <div className='flex gap-1'>
                <p className='md:text-xl text-base font-bold'>{review.userName}</p>
                <img src={verifiedIcon} alt="" />
            </div>
            <p className={classNames('md:text-base text-sm opacity-60 text-wrap truncate', {'pb-5 h-32' : carousel, 'h-12' : !carousel})}>{review.content}</p>
            {!carousel && <p className='font-bold text-sm pb-5'>Posted on {formatDate(review.dateTime)}</p>}
        </div>
    )
}
