import React from 'react'

interface MobileMenuProps {
    showMenu: Boolean,
    closeMenu: () => void
}

export const MobileMenu = ({ showMenu, closeMenu }: MobileMenuProps) => {
    if (showMenu) {
        return (<div className='bg-slate-400 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-5 z-20'>
            <div> Shop</div>
            <div>On Sale</div>
            <div>New Arrivals</div>
            <div>Brands</div>
            <div onClick={() => closeMenu()}>X</div>
        </div >
        )
    }
    else return null

}
