import React from 'react'
import navigationIcon from '../assets/icons/navigation.png'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
    category?: boolean,
    cart?: boolean,
    product?: boolean
}

export const Breadcrumb = ({category = false, cart = false, product = false} : BreadcrumbProps) => {
    return (
        <div className="bg-white">
            <ul className=" flex gap-2 text-sm items-center pt-5 pb-5">
                <Link to="/" className=" cursor-pointer">
                    Home
                </Link>
                <img src={navigationIcon} className="w-5 h-5" alt="" />
                { category && <Link to="/category" className=" cursor-pointer">
                    Category
                </Link>}
                { product && <Link to="/product" className=" cursor-pointer">
                    Product Details
                </Link>}
                { cart && <Link to="/cart" className=" cursor-pointer">
                    Cart
                </Link>}
            </ul>
        </div>
    )
}
