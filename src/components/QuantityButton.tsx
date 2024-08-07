import React, { ChangeEvent, useRef } from 'react'

interface QuantityButtonProps {
    height?: number
    quantity?: number
    increaseQuantity: () => void
    decreaseQuantity: () => void
    setQuantity: (num: number) => void
}

export const QuantityButton = ({ height = 8, quantity = 1, increaseQuantity, decreaseQuantity, setQuantity }: QuantityButtonProps) => {
    let intervalId = useRef<number>()
    let timeOutId = useRef<number>()

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);
        if (value >= 0) {
            setQuantity(value)
        }
    }

    function fastChange(action: string) {
        if (!intervalId.current) {
            if (action === "increase") {
                intervalId.current = setInterval(increaseQuantity, 100)
            }
            if (action === "decrease") {
                intervalId.current = setInterval(decreaseQuantity, 100)
            }
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
                onClick={decreaseQuantity}
                onMouseDown={() => holdFast("decrease")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
            <input className='bg-background focus:outline-none w-1/3 text-center' type="test" name="quantity" id="quantity" value={quantity} onChange={handleOnChange} />
            <i
                className='bx bx-plus w-1/3 flex items-center justify-center mr-3 text-2xl cursor-pointer'
                onClick={increaseQuantity}
                onMouseDown={() => holdFast("increase")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
        </div>
    )
}
