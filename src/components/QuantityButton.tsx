import classNames from 'classnames'
import React, { ChangeEvent, useRef, useState } from 'react'

interface QuantityButtonProps {
    height?: number
    quantity: number
    handleAdd: () => void
    handleDecrease: () => void
    setQuantity?: (num: number) => void
    rerender?: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuantityButton = ({ height = 8, quantity = 1, handleAdd, handleDecrease, setQuantity, rerender }: QuantityButtonProps) => {
    const [quantityCart, setQuantityCart] = useState<number>(quantity)

    let intervalId = useRef<number>()
    let timeOutId = useRef<number>()

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);
        if (value >= 0 && setQuantity) {
            setQuantity(value)
        }
    }

    function handleAddCart() {
        handleAdd();
        setQuantityCart(prevq => prevq + 1)
    }

    function handleDecreaseCart() {
        handleDecrease();
        setQuantityCart((prevq) => {
            if (prevq > 0) {
                return prevq - 1
            } else {
                // if (rerender) {
                //     rerender(prev => !prev)
                // }
                return 0
            }
        })
    }

    function fastChange(action: string) {
        if (!intervalId.current) {
            if (setQuantity) {
                if (action === "increase") {
                    intervalId.current = setInterval(handleAdd, 100)
                }
                if (action === "decrease") {
                    intervalId.current = setInterval(handleDecrease, 100)
                }
            } else {
                if (action === "increase") {
                    intervalId.current = setInterval(handleAddCart, 100)
                }
                if (action === "decrease") {
                    intervalId.current = setInterval(handleDecreaseCart, 100)
                }
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
                onClick={setQuantity ? handleDecrease : handleDecreaseCart}
                onMouseDown={() => holdFast("decrease")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
            <input className={classNames('bg-background focus:outline-none w-1/3 text-center', { 'select-none': !setQuantity })} type="test" name="quantity" id="quantity" value={setQuantity ? quantity : quantityCart} readOnly={!setQuantity} onChange={handleOnChange} />
            <i
                className='bx bx-plus w-1/3 flex items-center justify-center mr-3 text-2xl cursor-pointer'
                onClick={setQuantity ? handleAdd : handleAddCart}
                onMouseDown={() => holdFast("increase")}
                onMouseUp={clear}
                onMouseLeave={clear}
            ></i>
        </div>
    )
}
