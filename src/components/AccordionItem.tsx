import React, { useState } from 'react'
import classNames from 'classnames'

interface AccordionItemProps {
    title: string,
    heading?: boolean,
    children: React.ReactNode,
    expand?: boolean
}

export const AccordionItem = ({ title, heading = false, children, expand = false }: AccordionItemProps) => {
    const [showData, setShowData] = useState(expand);

    const toggleShowData = () => {
        setShowData(prevShowdata => !prevShowdata);
    }

    return (
        <div className=''>
            <div className='flex relative justify-between items-center'>
                <p className={classNames('', { 'font-bold text-xl opacity-100': heading })}>{title}</p>
                <i className={classNames('bx bx-chevron-right relative text-2xl -right-1 transition-all', { 'rotate-90': showData, 'opacity-100' : heading, 'opacity-50' : !heading })} onClick={() => { toggleShowData() }}></i>
            </div>
            {showData && <div>{children}</div>}
        </div>
    )
}
