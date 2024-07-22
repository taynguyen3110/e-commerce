import React, { useState } from 'react'

interface AccordionItemProps {
    heading: string,
    children: React.ReactNode
}

export const AccordionItem = ({ heading, children }: AccordionItemProps) => {
    const [showData, setShowData] = useState(false);

    const toggleShowData = () => {
        setShowData(prevShowdata => !prevShowdata);
    }

    return (
        <div className=''>
            <div className='flex relative justify-between items-center'>
                <p>{heading}</p>
                <i className={`bx bx-chevron-right relative opacity-50 text-2xl -right-1 transition-all ${showData && 'rotate-90'}`} onClick={() => { toggleShowData() }}></i>
            </div>
            {showData && <div>{children}</div>}
        </div>
    )
}
