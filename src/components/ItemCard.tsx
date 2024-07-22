import React from 'react'
import classNames from 'classnames';
import tShirtImg from '../assets/images/new-arrival/t-shirt-tape.png';
import ProductDetails from '../pages/ProductDetails';
// import  from '../assets/icons/4.5-star.png';

interface ItemCardProps {
    product: Product
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

export const ItemCard = ({ product }: ItemCardProps) => {

    const ratingStar = (rating: number) => {
        let star = [];
        let processedRating = Math.round(rating * 2) / 2;

        for (let index = 0; index < Math.floor(processedRating); index++) {
            star.push(<i className='bx bxs-star text-yellow-400' ></i>);
        }
        if (processedRating % 1 != 0) {
            star.push(<span className='relative top-0 inline-block h-4 w-2 overflow-hidden'><i className='bx bxs-star relative -top-[2px] text-yellow-400' ></i></span>);
        }
        return <span className='relative mr-3'>{star}</span>;
    };

    return (
        <div className='flex flex-col gap-[6px] w-[48%] md:mb-0 mb-5'>
            <div className='mb-2'>
                <a href='/product'><img className='md:rounded-2xl rounded-xl max-h-96' src={product.productImg} alt="" /></a>
            </div>
            <div>
                <a href='/product'><p className='lg:text-xl text-base font-bold truncate'>{product.name}</p></a>
            </div>
            <div className='flex items-center'>
                {ratingStar(product.rating)}
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
