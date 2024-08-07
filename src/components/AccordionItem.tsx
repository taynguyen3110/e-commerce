import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

interface AccordionItemProps {
    title: string,
    heading?: boolean,
    children: React.ReactNode,
    expand?: boolean,
    bullet?: number | null,
    setFaq?: (num: number) => void,
    faq?: number,
}

export const AccordionItem = ({ title, heading = false, children, expand = false, bullet = null, setFaq, faq }: AccordionItemProps) => {
    const [showData, setShowData] = useState(expand);

    useEffect(() => {
        if (bullet) {
            setShowData(faq === bullet)
        }
    }, [faq])

    function handleViewQuestion(): void {
        if (showData && setFaq) {
            setFaq(6)
        } else
            bullet && setFaq ? setFaq(bullet) : {}
    }

    function toggleShowData(): void {
        setShowData(prevShowData => !prevShowData)
    }

    return (
        <div className={classNames('', { 'pl-16 border-y-2 py-6 lg:py-10': bullet })}>
            <div className={classNames('flex relative justify-between items-center cursor-pointer', { '': bullet })} onClick={bullet ? handleViewQuestion : toggleShowData}>
                {bullet && <button disabled className={classNames('absolute w-10 py-2 rounded-xl border -translate-x-full -left-5', { 'bg-slate-200': showData })}>{bullet}</button>}
                <p className={classNames('', { 'font-bold text-xl opacity-100': heading, 'text-lg lg:text-xl font-bold': bullet })}>{title}</p>
                <i className={classNames('bx bx-chevron-right relative text-2xl -right-1 transition-all', { 'rotate-90': showData, 'opacity-100': heading, 'opacity-50': !heading, '': bullet })} ></i>
            </div>
            {showData && <div className={classNames('', { 'mt-5 flex flex-col gap-3 lg:text-lg': bullet })}>{children}</div>}
        </div>
    )
}
