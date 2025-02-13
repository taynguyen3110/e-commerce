import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
interface DropdownProps {
    trigger: React.ReactNode,
    children: React.ReactNode,
    fullWidth?: Boolean,
    align?: "left" | "right",
    offset?: number
}

export const Dropdown = ({ trigger, children, fullWidth, align = 'left', offset = 0 }: DropdownProps) => {
    const [show, setShow] = useState(false)
    const className = classNames('absolute bg-white border rounded-3xl min-[480px]:py-2 bottom-0 shadow-lg', { 'w-[400px]': fullWidth, 'left-0': align === "left", 'right-0': align === 'right' })
    return (
        <div className='relative z-30' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <div>{trigger}</div>
            {show &&
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={className} style={{ transform: `translate(${offset}px, 100%)` }}>
                    {children}
                </motion.div>}
        </div>
    )
}
