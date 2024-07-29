import React from 'react'
import classNames from 'classnames';
import ProductDetails from '../pages/ProductDetails';
import { Rating } from './Rating';
// import  from '../assets/icons/4.5-star.png';

interface ItemCardProps {
    product: Product,
    itemEachRows: number
}

interface Product {
    id: string,
    name: string,
    imageSrc: string,
    productImg: string,
    price: number,
    rating: number,
    sale: number,
    salePrice: number,
    colors: string,
}

export const ItemCard = ({ product, itemEachRows }: ItemCardProps) => {

    const widthClass = `calc((100% - ${12 * (itemEachRows - 1)}px) / ${itemEachRows})`;

    return (
        <div className='flex flex-col gap-[6px] md:mb-0 mb-5' style={{ width: `${widthClass}` }}>
            <div className='mb-2'>
                <a href='/product'><img className='md:rounded-2xl rounded-xl max-h-96' src={product.productImg} alt="" /></a>
            </div>
            <div>
                <a href='/product'><p className='lg:text-xl text-base font-bold truncate'>{product.name}</p></a>
            </div>
            <div className='flex items-center'>
                <Rating rating={product.rating} />
                <span className='lg:text-sm text-xs'>{product.rating}<span className='opacity-60'>/5</span></span>
            </div>
            <div>
                <div className='flex items-center gap-[10px] lg:text-2xl text-xl font-bold'>
                    <div>${product.salePrice}</div>
                    {product.sale !== 0 ?
                        <>
                            <div className='opacity-40 line-through'>{product.price}</div>
                            <div className='lg:text-xs text-[10px] flex items-center md:px-[14px] md:py-[6px] px-1 h-5 text-[#FF3333] bg-opacity-10 bg-[#FF3333] rounded-full'>-{product.sale}%</div>
                        </>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}
