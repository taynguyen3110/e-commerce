import React from 'react'
import navigationIcon from '../assets/icons/navigation.png'
import { Link } from 'react-router-dom'

export const Breadcrumb = () => {
    return (
        <div className="bg-white ">
            <ul className=" flex gap-2 text-sm items-center pt-5 pb-3">
                <Link to="/" className=" cursor-pointer">
                    Home
                </Link>
                <img src={navigationIcon} className="w-5 h-5 " alt="" />
                <Link to="/category" className=" cursor-pointer">
                    Category
                </Link>
            </ul>
        </div>
    )
}
