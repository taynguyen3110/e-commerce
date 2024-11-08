import React, { useEffect, useState } from 'react'
import Downshift from 'downshift'
import searchIcon from '../assets/icons/search.png'
import { getAllProductNames } from '../services/productServices'

type Item = {
    id: number,
    name: string
}

export const SearchInput = () => {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        const data = await getAllProductNames()
        setItems(
            data as Item[]
        )
    }

    return (
        <Downshift
            onChange={selection => {
                // if (selection) {
                // }
            }
            }
            itemToString={item => (item ? item.name : '')}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps,
            }) => (
                <div className='flex items-center justify-stretch w-full relative'>
                    <label {...getLabelProps()}></label>
                    <div className='w-full justify-end'
                        style={{ display: 'flex' }}
                        {...getRootProps({}, { suppressRefError: true })}
                    >
                        <div className='w-full flex justify-end relative'>
                            <img className='absolute top-1/2 translate-y-[-50%] left-4 opacity-40 z-30' src={searchIcon} alt="" />
                            <input className='bg-background py-2 pl-[52px] w-full rounded-full md:placeholder:text-base truncate placeholder:text-sm' placeholder='Search for products' {...getInputProps()} />
                        </div>
                    </div>
                    {isOpen
                        ? (
                            <ul className='absolute block top-12 w-full h-60 overflow-y-scroll bg-white py-2 border rounded z-10' {...getMenuProps()}>
                                {isOpen
                                    ? items
                                        .filter(item => inputValue && item.name.includes(inputValue))
                                        .map((item, index) => (
                                            <a href={`/product/${item.id}`}>
                                                <li className='cursor-pointer p-2 rounded text-left'
                                                    {...getItemProps({
                                                        key: item.name,
                                                        index,
                                                        item,
                                                        style: {
                                                            backgroundColor:
                                                                highlightedIndex === index ? '#C8C6BE' : 'white',
                                                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                                                            color: highlightedIndex === index ? '#F4F2EA' : 'black'
                                                        },
                                                    })}
                                                >
                                                    {item.name}
                                                </li>
                                            </a>

                                        ))
                                    : null}
                            </ul>
                        ) : null}
                </div>
            )}
        </Downshift>
    )
}
