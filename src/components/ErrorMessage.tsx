import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{message}</span>;
};

export default ErrorMessage;