import React from 'react';

interface InputFieldProps {
  type: string;
  iconClass: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const InputField = ({ type, iconClass, placeholder, onChange, inputRef }: InputFieldProps) => {
  return (
    <div className='relative'>
      <i className={`${iconClass} absolute text-2xl left-5 md:top-3 top-2`}></i>
      <input
        type={type}
        ref={inputRef}
        className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputField;