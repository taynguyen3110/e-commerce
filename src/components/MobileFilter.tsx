import React from 'react'
import { AccordionItem } from './AccordionItem'
import { ItemCard } from './ItemCard'

interface MobileFilterProps {
    closeFilter: () => void
}

export const MobileFilter = ({ closeFilter }: MobileFilterProps) => {
    return (
        <div>
            <div className='fixed top-0 left-0 bg-black opacity-20 w-screen h-screen z-20'></div>
            <div className='absolute w-full bg-white z-30 rounded-2xl'>
                <div className='container px-4 py-3'>
                    <div className='flex justify-between relative items-center'>
                        <h4 className='font-bold text-xl'>Filters</h4>
                        <i className='bx bx-x relative -right-[6px] opacity-40 text-3xl' onClick={() => closeFilter()}></i>
                    </div>
                    <hr className='my-2' />
                    <div>
                        <AccordionItem heading='T-shirts'>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                        </AccordionItem>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
