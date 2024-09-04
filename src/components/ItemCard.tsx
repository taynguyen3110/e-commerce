import React, { useState } from 'react'
import classNames from 'classnames';
import { Rating } from './Rating';
import { Product } from '../services/productServices';
import { calSalePrice } from '../utils/calSalePrice';
import { getFirstImage } from '../utils/getFirstImage';
import ContentLoader from "react-content-loader"

interface ItemCardProps {
    product: Product,
    itemEachRows: number
}
export const ratio = 255 / 306

export const ItemCard = ({ product, itemEachRows }: ItemCardProps) => {
    const [loaded, setLoaded] = useState(false)

    const widthClass = `calc((100% - ${12 * (itemEachRows - 1)}px) / ${itemEachRows})`;

    if (product) {
        return (
            <div className='flex flex-col gap-[6px] md:mb-0 mb-5' style={{ width: `${widthClass}` }}>
                <div className='mb-2'>
                    <a href={`/product/${product.id}`}>
                        <img
                            className='md:rounded-2xl rounded-xl max-h-96 2xl:max-h-none'
                            src={getFirstImage(product)} alt={product.name}
                            style={{
                                display: loaded ? 'block' : 'none',
                                width: '100%',
                                height: 'auto',
                            }}
                            onLoad={() => setLoaded(true)}
                        />
                        {!loaded &&
                            <ContentLoader
                                speed={2}
                                style={{ width: '100%', aspectRatio: ratio, borderRadius: '12px' }}
                                viewBox={`0 0 255 306`}
                                backgroundColor="#f3f3f3"
                                foregroundColor="#ecebeb"
                            >
                                <rect x="0" y="0" rx="0" ry="0" width='100%' height='100%' />
                            </ContentLoader>}
                    </a>
                </div>
                <div>
                    <a href={`/product/${product.id}`}><p className='lg:text-xl text-base font-bold cursor-pointer truncate'>{product.name}</p></a>
                </div>
                <div className='flex items-center select-none'>
                    <Rating rating={product.rating} />
                    <span className='lg:text-sm text-xs'>{product.rating}<span className='opacity-60'>/5</span></span>
                </div>
                <div>
                    <div className='flex items-center gap-[10px] lg:text-2xl text-xl font-bold select-none'>
                        <div><span>${calSalePrice(product)}</span></div>
                        {product.sale !== 0 ?
                            <>
                                <div className='opacity-40 line-through'><span>{product.price}</span></div>
                                <div className='lg:text-xs text-[10px] flex items-center md:px-[14px] md:py-[6px] px-1 h-5 text-[#FF3333] bg-opacity-10 bg-[#FF3333] rounded-full'><span>-{product.sale}%</span></div>
                            </>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    } else return null
}
