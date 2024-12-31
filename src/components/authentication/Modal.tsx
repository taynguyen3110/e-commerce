import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className='flex items-center justify-center fixed w-screen h-screen bg-black bg-opacity-40 z-50'>
      <motion.div style={{ x: 20 }} animate={{ x: 0 }} className='bg-white shadow-2xl flex flex-col justify-center relative top-5 pt-16 pb-8 w-[350px] h-auto rounded-3xl px-6 z-50'>
        <i className='bx bx-x text-2xl opacity-60 font-bold cursor-pointer absolute right-5 top-4' onClick={onClose}></i>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;