import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ItemCard } from './ItemCard'
import { getRandomProducts, ProductDetails } from '../services/productServices';
import useMediaQuery from '../hooks/useMediaQuery';

interface Props {
    title: string,
    viewButton?: boolean
}

export const Suggestion: React.FC<Props> = ({ viewButton = true, title }: Props) => {
    const [productsData, setProductsData] = useState<ProductDetails[]>([])

    const navigate = useNavigate()

    const xsScreen = useMediaQuery('(max-width: 640px)')
    const smScreen = useMediaQuery('(max-width: 768px)')
    const itemCount = xsScreen ? 2 : smScreen ? 3 : 4

    useEffect(() => {
        setProductsData(getRandomProducts(itemCount))
    }, [itemCount])


    return (
        <div className='flex flex-col items-stretch'>
            <h1 className='md:text-5xl text-3xl lg:pt-20 pt-12 lg:pb-16 pb-8 text-center'>{title}</h1>
            <div className='flex md:flex-nowrap flex-wrap md:justify-stretch justify-evenly gap-3'>
                {
                    productsData.map((p) => {
                        return (
                            <ItemCard product={p} itemEachRows={itemCount} />
                        )
                    })
                }
            </div>
            {viewButton && <div className='flex justify-center'>
                <button className='md:mt-10 lg:mb-16 mt-2 mb-10 md:py-[14px] md:px-20 py-3 px-[39%] md:text-base text-sm border-black border border-opacity-10 rounded-full' onClick={() => { navigate('/category') }}>View All</button>
            </div>}
        </div>
    )
}
