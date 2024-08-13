import React from 'react'
import Downshift from 'downshift'
import searchIcon from '../assets/icons/search.png'


export const SearchInput = () => {
    const items = [
        { value: 'apple' },
        { value: 'pear' },
        { value: 'orange' },
        { value: 'orange2' },
        { value: 'orange3' },
        { value: 'grape' },
        { value: 'banana' },
        { value: 'banana2' },
        { value: 'banana3' },
        { value: 'banana4' },
    ]
    return (
        <Downshift
            onChange={selection =>
                alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
            }
            itemToString={item => (item ? item.value : '')}
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
                <div className='flex items-center justify-stretch relative'>
                    <label {...getLabelProps()}></label>
                    <div className='w-full justify-end'
                        style={{ display: 'flex' }}
                        {...getRootProps({}, { suppressRefError: true })}
                    >
                        <div className='w-full flex justify-end relative'>
                            <img className='absolute top-1/2 translate-y-[-50%] left-4 opacity-40' src={searchIcon} alt="" />
                            <input className='bg-background py-2 pl-[52px] w-full rounded-full md:placeholder:text-base placeholder:text-sm' placeholder='Search for products' {...getInputProps()} />
                        </div>
                    </div>
                    {isOpen
                        ? (
                            <ul className='absolute block top-12 w-full bg-white py-2 border rounded z-10' {...getMenuProps()}>
                                {isOpen
                                    ? items
                                        .filter(item => !inputValue || item.value.includes(inputValue))
                                        .map((item, index) => (
                                            <li className='cursor-pointer py-1 rounded'
                                                {...getItemProps({
                                                    key: item.value,
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
                                                {item.value}
                                            </li>
                                        ))
                                    : null}
                            </ul>
                        ) : null}
                </div>
            )}
        </Downshift>
    )
}
