import React from 'react'
import { ItemCard } from './ItemCard'

interface Props {
    title: string;
}

export const Suggestion: React.FC<Props> = (props) => {
    return (
        <div className='flex flex-col items-stretch'>
            <h1 className='text-5xl pt-20 pb-16 text-center'>{props.title}</h1>
            <div className='flex justify-between'>
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </div>
            <div className='flex justify-center'>
                <button className='mt-10 mb-16 py-[14px] px-20 border-black border border-opacity-10 rounded-full'>View All</button>
            </div>
        </div>
    )
}
