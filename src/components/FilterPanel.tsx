import React, { useEffect, useState } from 'react'
import { AccordionItem } from './AccordionItem'
import { ItemCard } from './ItemCard'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { getProductColors, Colors } from '../services/productServices';
import filerIcon from '../assets/icons/filter.png'


interface FilterPanelProps {
    closeFilter: () => void
}

export const FilterPanel = ({ closeFilter }: FilterPanelProps) => {

    const [minValue, setMinValue] = useState(50);
    const [maxValue, setMaxValue] = useState(200);
    const [colors, setColors] = useState<Colors>({})
    const [colorInput, setColorInput] = useState('')

    useEffect(() => {
        setColors(getProductColors());
    }, [])

    function formatTitle(str: string) {
        let formatedTitle = str.replace('+', ' ');
        return formatedTitle.charAt(0).toUpperCase() + formatedTitle.slice(1);
    }

    console.log(colors)

    return (
        <>
            <div className='fixed lg:hidden top-0 left-0 bg-black opacity-20 h-full w-screen z-20'></div>
            <div className='sm:sticky lg:static lg:h-auto top-0 left-0 h-0 lg:w-[25%] sm:w-0 w-full z-30'>
                <div className='relative lg:w-full sm:w-96 sm:h-auto bg-white border border-opacity-20 z-40 rounded-2xl w-[calc(100%+32px)] lg:left-0 -left-4'>
                    <div className='filter-container container px-4 py-3 lg:h-auto sm:h-screen h-auto sm:overflow-y-scroll sm:overflow-x-hidden'>
                        <div className='flex justify-between relative items-center'>
                            <h4 className='font-bold text-xl'>Filters</h4>
                            <i className='bx bx-x relative -right-[6px] opacity-40 text-3xl lg:hidden' onClick={() => closeFilter()}></i>
                            <img src={filerIcon} className='self-end hidden lg:block' alt="Filter Icon" />
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='T-shirts'>
                                <ul>
                                    <li>Basic Tees</li>
                                    <li>Long Sleeve Tees</li>
                                    <li>Short Sleeve Tees</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Shorts'>
                                <ul>
                                    <li>Athletic Shorts</li>
                                    <li>Running Shorts</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Shirts'>
                                <ul>
                                    <li>Casual Shirts</li>
                                    <li>Button-Down Shirts</li>
                                    <li>Oxford Shirts</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Hoodie'>
                                <ul>
                                    <li>Pullover Hoodies</li>
                                    <li>Crop Hoodies</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Jeans'>
                                <ul>
                                    <li>Straight-Leg Jeans</li>
                                    <li>Skinny Jeans</li>
                                </ul>
                            </AccordionItem>
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='Price' heading={true} expand={true}>
                                <div className='range-input'>
                                    <MultiRangeSlider
                                        id='multi-range-slider-css'
                                        min={0}
                                        max={250}
                                        step={50}
                                        minValue={minValue}
                                        maxValue={maxValue}
                                        ruler={false}
                                        label={false}
                                        onInput={(e: ChangeResult) => {
                                            setMinValue(e.minValue);
                                            setMaxValue(e.maxValue);
                                        }}
                                    ></MultiRangeSlider>
                                </div>
                            </AccordionItem>
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='Colors' heading={true} expand={true}>
                                <div className='flex flex-wrap gap-4 mt-4'>
                                    {
                                        Object.entries(colors).map(([key, value]) => (
                                            <button
                                                className='p-5 rounded-full border'
                                                title={formatTitle(key)}
                                                style={{ backgroundColor: value }}
                                            ></button>
                                        ))
                                    }
                                </div>
                            </AccordionItem>
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='Size' heading={true} expand={true}>
                                <div className='mt-3 flex flex-wrap gap-3'>
                                    <button className='px-6 py-3 bg-background rounded-full'><p>Small</p></button>
                                    <button className='px-6 py-3 bg-background rounded-full'>Medium</button>
                                    <button className='px-6 py-3 bg-background rounded-full'>Large</button>
                                </div>
                            </AccordionItem>
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='Dress Style' heading={true} expand={true}>
                                <AccordionItem title='Casual'>
                                    <ul>
                                        <li>Everyday wear</li>
                                        <li>Casual outings</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Formal'>
                                    <ul>
                                        <li>Business attire</li>
                                        <li>Formal events</li>
                                        <li>Dress shirts</li>
                                        <li>Suits</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Party'>
                                    <ul>
                                        <li>Evening wear</li>
                                        <li>Cocktail dresses</li>
                                        <li>Party outfits</li>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Gym'>
                                    <ul>
                                        <li>Activewear</li>
                                        <li>Sportswear</li>
                                        <li>Gym gear</li>
                                    </ul>
                                </AccordionItem>
                            </AccordionItem>
                        </div>
                        <div className='flex items-center justify-center mt-3'>
                            <button className='bg-black text-white w-full py-3 rounded-full text-sm'>Apply Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
