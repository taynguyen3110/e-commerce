import React from 'react'
import useMediaQuery from '../shared/hooks/useMediaQuery'
import { useUserAuth } from '../shared/context/UserAuthContext';
import { useShoppingCart } from '../shared/context/ShoppingCartContext';
import { motion } from 'framer-motion';

interface MobileMenuProps {
    showMenu: Boolean,
    closeMenu: () => void,
    displayLogin: () => void
    displayCreateAcc: () => void
}

export const MobileMenu = ({ showMenu, closeMenu, displayLogin, displayCreateAcc }: MobileMenuProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { user, signOut } = useUserAuth()
    const { clearCart } = useShoppingCart()

    if (showMenu && isMobile) {
        return (
            <div className='fixed w-screen h-screen bg-black bg-opacity-20 z-40'>
                <motion.div style={{ x: -20 }} animate={{ x: 0 }} className='bg-white shadow-2xl fixed flex flex-col top-0 left-0 w-3/5 h-full rounded-tr-2xl rounded-br-2xl'>
                    <div className='h-20 bg-background rounded-tr-2xl flex items-center justify-between w-full px-6 border-b-2 mb-8'>
                        <span className='flex items-center gap-2 text-sm sm:text-base'>
                            {user?.photoURL ? <img className='rounded-full w-9 ' src={user.photoURL} alt='profile picture' /> : <i className='bx bx-user-circle text-4xl' ></i>}{user ? user.email : 'Guest'}
                        </span>
                        <i className='bx bx-x text-2xl opacity-60 font-bold cursor-pointer' onClick={() => closeMenu()}></i>
                    </div>
                    <p className='pl-6 text-xs'>MAIN</p>
                    <div className='sm:px-0 flex flex-col z-50 text-base'>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-purchase-tag font-bold text-2xl' ></i>On Sale</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-label font-bold text-2xl' ></i>New Arrivals</div>
                        <div className='menu-item flex gap-5 items-center'><i className='bx bx-flag font-bold text-2xl' ></i>Brands</div>
                        {user ?
                            <>
                                <p className='pl-6 text-xs pt-4'>ACCOUNT</p>
                                <div className='menu-item flex gap-5 items-center'><i className='bx bx-package font-bold text-2xl' ></i>Orders</div>
                                <div className='menu-item flex gap-5 items-center'><i className='bx bx-right-top-arrow-circle font-bold text-2xl' ></i>Delivery Details</div>
                                <div className='menu-item flex gap-5 items-center'><i className='bx bxs-user-account font-bold text-2xl' ></i>Account</div>
                                <div className='menu-item flex gap-5 items-center'><i className='bx bxs-notepad font-bold text-2xl' ></i>Manage Deliveries</div>
                            </>
                            : null}
                    </div>
                    <div className='flex flex-col mt-auto bg-background border-t-2 rounded-br-2xl py-5 px-6 gap-3'>
                        {!user ?
                            <>
                                <button className='py-3 sm:py-4 border text-sm sm:text-base bg-white rounded-full'
                                    onClick={() => {
                                        displayCreateAcc()
                                    }}
                                >Create Account</button>
                                <button className='py-3 sm:py-4 bg-black text-sm sm:text-base text-white rounded-full' onClick={() => displayLogin()}>Login</button>
                            </>
                            :
                            <button className='py-3 sm:py-4 bg-black text-sm sm:text-base text-white rounded-full' onClick={() => {
                                clearCart()
                                signOut()
                            }
                            }>Log Out</button>
                        }
                    </div>
                </motion.div >
            </div>
        )
    }
    else return null

}
