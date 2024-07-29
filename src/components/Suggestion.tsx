import React, { useEffect, useState } from 'react'
import { ItemCard } from './ItemCard'
import { getRandomProducts, ProductDetails } from '../services/productServices';

interface Props {
    title: string;
}

export const Suggestion: React.FC<Props> = (props) => {
    const [productsData, setProductsData] = useState<ProductDetails[]>([])

    useEffect(() => {
        setProductsData(getRandomProducts(4))
    }, [])


    return (
        <div className='flex flex-col items-stretch'>
            <h1 className='md:text-5xl text-3xl md:pt-20 pt-12 md:pb-16 pb-8 text-center'>{props.title}</h1>
            <div className='flex md:flex-nowrap flex-wrap md:justify-stretch justify-evenly gap-3'>
                {
                    productsData.map((p) => {
                        return (
                            <ItemCard product={p} />
                        )
                    })
                }
            </div>
            <div className='flex justify-center'>
                <button className='md:mt-10 md:mb-16 mt-2 mb-10 md:py-[14px] md:px-20 py-3 px-[39%] md:text-base text-sm border-black border border-opacity-10 rounded-full'>View All</button>
            </div>
        </div>
    )
}
