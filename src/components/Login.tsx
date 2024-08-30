import React, { useEffect } from 'react';

interface LoginProps {
  hideLogin: () => void
}

const Login = ({ hideLogin }: LoginProps) => {


  return (
    <div className='flex items-center justify-center fixed w-screen h-screen bg-black bg-opacity-40 z-50'>
      <div className='bg-white flex flex-col justify-center relative pt-10 pb-5 min-w-[400px] min-h-[400px] h-auto rounded-3xl'>
        <i className='bx bx-x text-2xl opacity-60 font-bold cursor-pointer absolute right-3 top-2' onClick={() => hideLogin()}></i>
        <div>
          <div>
            <h1>Welcome</h1>
            <p>We are glad to see you join us!</p>
          </div>
          <div>
            <form action="">
              
            </form>
          </div>
          <div className='flex items-center'>
            <hr className='w-1/4'/>
            <div>Login with Others</div>
            <hr className='w-1/4'/>
          </div>
          <div>
            <button>Login with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
