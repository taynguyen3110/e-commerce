import React, { useEffect, useState } from 'react'
import { AccordionItem } from './AccordionItem'
import { ItemCard } from './ItemCard'
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { getProductsColors, Colors } from '../services/productServices';
import filerIcon from '../assets/icons/filter.png'
import { formatTitle } from '../utils/formatTitle';
import { ListItem } from './ListItem';


interface FilterPanelProps {
    closeFilter: () => void
}

export const FilterPanel = ({ closeFilter }: FilterPanelProps) => {

    const [minValue, setMinValue] = useState(50);
    const [maxValue, setMaxValue] = useState(200);
    const [colors, setColors] = useState<Colors>({})
    const [colorInput, setColorInput] = useState('')
    const [sizeInput, setSizeInput] = useState('')

    useEffect(() => {
        fetchProductsColors()
    }, [])

    async function fetchProductsColors() {
        const colors = await getProductsColors()
        setColors(colors)
    }

    return (
        <>
            <div className='fixed lg:hidden top-0 left-0 bg-black opacity-20 h-full w-screen z-20'></div>
            <div className='sm:sticky lg:static lg:h-auto top-0 left-0 h-0 lg:w-[25%] sm:w-0 w-full z-30'>
                <div className='relative lg:w-full sm:w-96 sm:h-auto bg-white border border-opacity-20 z-40 rounded-2xl w-[calc(100%+32px)] sm:left-0 -left-4'>
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
                                    <ListItem>Basic Tees</ListItem>
                                    <ListItem>Long Sleeve Tees</ListItem>
                                    <ListItem>Short Sleeve Tees</ListItem>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Shorts'>
                                <ul>
                                    <ListItem>Athletic Shorts</ListItem>
                                    <ListItem>Running Shorts</ListItem>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Shirts'>
                                <ul>
                                    <ListItem>Casual Shirts</ListItem>
                                    <ListItem>Button-Down Shirts</ListItem>
                                    <ListItem>Oxford Shirts</ListItem>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Hoodie'>
                                <ul>
                                    <ListItem>Pullover Hoodies</ListItem>
                                    <ListItem>Crop Hoodies</ListItem>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title='Jeans'>
                                <ul>
                                    <ListItem>Straight-Leg Jeans</ListItem>
                                    <ListItem>Skinny Jeans</ListItem>
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
                                <div className='flex flex-wrap gap-3 mt-4'>
                                    {
                                        Object.entries(colors).map(([key, value]) => (
                                            <button
                                                className='p-5 rounded-full border hover:border-black'
                                                title={formatTitle(key)}
                                                style={{ backgroundColor: value, outline: key === colorInput ? '2px solid black' : '2px solid white' }}
                                                onClick={() => { setColorInput(key) }}
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
                                    <button
                                        className='px-5 py-2 bg-background rounded-full'
                                        onClick={() => { setSizeInput('S') }}
                                        style={sizeInput === 'S' ? { backgroundColor: 'black', color: 'white' } : {}}
                                    >Small</button>
                                    <button
                                        className='px-5 py-2 bg-background rounded-full'
                                        onClick={() => { setSizeInput('M') }}
                                        style={sizeInput === 'M' ? { backgroundColor: 'black', color: 'white' } : {}}
                                    >Medium</button>
                                    <button
                                        className='px-5 py-2 bg-background rounded-full'
                                        onClick={() => { setSizeInput('L') }}
                                        style={sizeInput === 'L' ? { backgroundColor: 'black', color: 'white' } : {}}
                                    >Large</button>
                                </div>
                            </AccordionItem>
                        </div>
                        <hr className='my-2' />
                        <div>
                            <AccordionItem title='Dress Style' heading={true} expand={true}>
                                <AccordionItem title='Casual'>
                                    <ul>
                                        <ListItem>Everyday wear</ListItem>
                                        <ListItem>Casual outings</ListItem>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Formal'>
                                    <ul>
                                        <ListItem>Business attire</ListItem>
                                        <ListItem>Formal events</ListItem>
                                        <ListItem>Dress shirts</ListItem>
                                        <ListItem>Suits</ListItem>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Party'>
                                    <ul>
                                        <ListItem>Evening wear</ListItem>
                                        <ListItem>Cocktail dresses</ListItem>
                                        <ListItem>Party outfits</ListItem>
                                    </ul>
                                </AccordionItem>
                                <AccordionItem title='Gym'>
                                    <ul>
                                        <ListItem>Activewear</ListItem>
                                        <ListItem>Sportswear</ListItem>
                                        <ListItem>Gym gear</ListItem>
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
