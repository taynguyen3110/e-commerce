import classNames from 'classnames'
import React, { useState } from 'react'
interface DropdownProps {
    trigger: React.ReactNode,
    children: React.ReactNode,
    fullWidth?: Boolean,
    align?: "left" | "right",
    offset?: number
}

export const Dropdown = ({ trigger, children, fullWidth, align = 'left', offset = 0}: DropdownProps) => {
    const [show, setShow] = useState(false)
    const className = classNames('absolute bg-gray-600 border p-5 bottom-0', { 'w-[400px]': fullWidth, 'left-0': align === "left", 'right-0': align === 'right' })
    return (
        <div className='relative' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div>{trigger}</div>
            {show && <div className={className} style={{transform: `translate(${offset}px, 100%)`}}>
                {children}
            </div>}
        </div>
    )
}
