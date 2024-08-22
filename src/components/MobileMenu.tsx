import React from 'react'

interface MobileMenuProps {
    showMenu: Boolean,
    closeMenu: () => void
}

export const MobileMenu = ({ showMenu, closeMenu }: MobileMenuProps) => {
    if (showMenu) {
        return (
            <div className='fixed w-screen h-screen bg-black bg-opacity-20 z-40'>
                <div className='bg-white fixed flex flex-col top-0 left-0 w-3/5 h-full rounded-tr-2xl rounded-br-2xl'>
                    <div className='h-20 bg-background rounded-tr-2xl flex items-center justify-between w-full px-6 border-b-2 mb-8'>
                        <span className='flex items-center gap-4 opacity-60'>
                            <i className='bx bx-user-circle text-4xl ' ></i> Guest
                        </span>
                        <i className='bx bx-x text-2xl opacity-60 font-bold' onClick={() => closeMenu()}></i>
                    </div>
                    <p className='pl-6 text-xs'>MAIN</p>
                    <div className='md:px-0 flex flex-col z-50 text-base'>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-store-alt font-bold text-2xl opacity-60' ></i>Shop</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-purchase-tag font-bold text-2xl opacity-60' ></i>On Sale</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-label font-bold text-2xl opacity-60' ></i>New Arrivals</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-flag font-bold text-2xl opacity-60' ></i>Brands</div>
                        <p className='pl-6 text-xs pt-4'>ACCOUNT</p>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-package font-bold text-2xl opacity-60' ></i>Orders</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-right-top-arrow-circle font-bold text-2xl opacity-60' ></i>Delivery Details</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bxs-user-account font-bold text-2xl opacity-60' ></i>Account</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bxs-notepad font-bold text-2xl opacity-60' ></i>Manage Deliveries</div>
                    </div>
                    <div className='flex flex-col mt-auto bg-background border-t-2 rounded-br-2xl py-5 px-6 gap-3'>
                        <button className='py-4 border bg-white rounded-full'>Create Account</button>
                        <button className='py-4 bg-black text-white rounded-full'>Login</button>
                    </div>
                </div >
            </div>
        )
    }
    else return null

}
