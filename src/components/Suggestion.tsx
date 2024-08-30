import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ItemCard } from './ItemCard'
import { getRandomProducts, Product } from '../services/productServices';
import useMediaQuery from '../shared/hooks/useMediaQuery';
import { toTitleCase } from '../utils/toTitleCase';

interface Props {
    title: string,
    viewButton?: boolean
}

export const Suggestion: React.FC<Props> = ({ viewButton = true, title }: Props) => {
    const [productsData, setProductsData] = useState<Product[]>([])
    const [itemCount, setItemCount] = useState<number>(0)

    const navigate = useNavigate()

    const xsScreen = useMediaQuery('(max-width: 640px)')
    const smScreen = useMediaQuery('(max-width: 768px)')

    useEffect(() => {
        fetchSuggestion()
    }, [])

    useEffect(() => {
        setItemCount(xsScreen ? 2 : smScreen ? 3 : 4)
    }, [xsScreen, smScreen])

    async function fetchSuggestion() {
        const productData = await getRandomProducts(4)
        setProductsData(productData)
    }

    return (
        <div className='flex flex-col items-stretch'>
            <h1 className='md:text-5xl text-3xl lg:pt-20 pt-12 lg:pb-16 pb-8 text-center'>{title}</h1>
            <div className='flex md:flex-nowrap flex-wrap md:justify-stretch justify-evenly gap-3'>
                {
                    productsData.slice(0, itemCount).map((p) => {

                        return (
                            <ItemCard product={p} itemEachRows={itemCount} />
                        )
                    })
                }
            </div>
            {viewButton && <div className='flex justify-center'>
                <button className='md:mt-10 lg:mb-16 mt-2 mb-10 md:py-[14px] md:px-20 py-3 px-[39%] md:text-base text-sm border-black border border-opacity-10 rounded-full' onClick={() => { navigate(`/category/${toTitleCase(title)}`) }}>View All</button>
            </div>}
        </div>
    )
}
