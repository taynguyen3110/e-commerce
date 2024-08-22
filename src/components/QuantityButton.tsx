import classNames from 'classnames'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

interface QuantityButtonProps {
    height?: number
    quantity: number
    handleAdd: () => void
    handleDecrease: () => void
    setQuantity?: (num: number) => void
    isCart?: boolean
}

export const QuantityButton = ({ height = 8, quantity = 1, handleAdd, handleDecrease, setQuantity, isCart = false }: QuantityButtonProps) => {

    useEffect(() => {
        return () => {
            clear()
        }
    }, [])


    let intervalId = useRef<number>()
    let timeOutId = useRef<number>()

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);
        if (value >= 0 && setQuantity) {
            setQuantity(value)
        }
    }

    function fastChange(action: string) {
        if (!intervalId.current) {
            if (action === "increase") {
                intervalId.current = setInterval(handleAdd, 150)
            }
            if (action === "decrease") {
                intervalId.current = setInterval(decreaseTillOne, 150)
            }
        }
    }

    function decreaseTillOne() { //not working!!!
        console.log('check');
        if (quantity <= 2) {
            console.log('stop');
            clear()
        } else {
            console.log('decrease');
            handleDecrease()
        }
    }

    function holdFast(action: string) {
        timeOutId.current = setTimeout(() => fastChange(action), 500)
    }

    function clear() {
        if (timeOutId.current) {
            clearTimeout(timeOutId.current)
            timeOutId.current = undefined
        }
        if (intervalId.current) {
            clearInterval(intervalId.current)
            intervalId.current = undefined
        }
    }
    return (
        <div className='bg-background flex w-[calc(30%)] rounded-full' style={{ padding: `${height}px 0px` }}>
            <i
                className='bx bx-minus w-1/3 flex items-center justify-center ml-3 text-2xl cursor-pointer'
                onClick={handleDecrease}
                onMouseDown={() => holdFast("decrease")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
            <input className={classNames('bg-background focus:outline-none w-1/3 text-center', { 'select-none': isCart })} type="test" name="quantity" id="quantity" value={quantity} readOnly={isCart} onChange={handleOnChange} />
            <i
                className='bx bx-plus w-1/3 flex items-center justify-center mr-3 text-2xl cursor-pointer'
                onClick={handleAdd}
                onMouseDown={() => holdFast("increase")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
        </div>
    )
}
