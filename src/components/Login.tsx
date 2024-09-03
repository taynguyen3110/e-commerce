import React, { useEffect, useRef, useState } from 'react';
import googleLogo from '../assets/icons/google-login.png'
import { useUserAuth } from '../shared/context/UserAuthContext';
import classNames from 'classnames';
import { notify } from '../utils/notify';
import { useShoppingCart } from '../shared/context/ShoppingCartContext';
import { saveUserToDB } from '../services/userServices';


interface LoginProps {
  hideLogin: () => void
  createAcc: boolean
}

const Login = ({ hideLogin, createAcc }: LoginProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [createAccount, setCreateAccount] = useState(createAcc)
  const [isRequesting, setIsRequesting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfPassword, setCfPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({ email: '', password: '', login: '', cfPassword: '' });

  const { signUp, signInWithEmail, signInWithGoogle, resetPassword, changePassword, signOut, user } = useUserAuth()
  const { cartItems, setCartItems } = useShoppingCart()


  useEffect(() => {
    inputRef.current ? inputRef.current.focus() : null
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleCfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCfPassword(e.target.value)
  }

  const validateInput = () => {
    setErrorMessage({ email: '', password: '', login: '', cfPassword: '' })
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setErrorMessage((prev) => ({ ...prev, email: '' }));
    }

    if (password.length < 6) {
      setErrorMessage((prev) => ({ ...prev, password: 'Password must be at least 6 characters.' }));
    } else {
      setErrorMessage((prev) => ({ ...prev, password: '' }));
    }

    if (createAccount) {
      if (password != cfPassword) {
        setErrorMessage((prev) => ({ ...prev, cfPassword: 'Password does not match.' }));
      } else {
        setErrorMessage((prev) => ({ ...prev, cfPassword: '' }));
      }
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setCfPassword('')
    setErrorMessage({ email: '', password: '', login: '', cfPassword: '' })
  }

  const handleSignInEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    validateInput();

    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length >= 6 && email != '' && password != '') {
      setIsRequesting(true)
      await signInWithEmail(email, password)
        .then((userCre) => {
          saveUserToDB(userCre.user, cartItems, setCartItems)
          notify("success", "Signed in with Email successfully!");
          setIsRequesting(false)
          hideLogin()
        })
        .catch((err) => {
          setIsRequesting(false)
          setErrorMessage(prev => ({ ...prev, login: err.message }))
        })
    }
  }

  const handleSignInGoogle = () => {
    setIsRequesting(true)
    signInWithGoogle()
      .then((userCre) => {
        saveUserToDB(userCre.user, cartItems, setCartItems)
        notify("success", "Signed in with Google successfully!");
        setIsRequesting(false)
        hideLogin()
      })
      .catch((err) => {
        setIsRequesting(false)
        setErrorMessage(prev => ({ ...prev, login: err.message }))
      })
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    validateInput();
    setIsRequesting(true)

    signUp(email, password)
      .then(() => {
        notify("success", "Account Created!");
        setIsRequesting(false)
        setCreateAccount(false)
      })
      .catch((err) => {
        setIsRequesting(false)
        setErrorMessage(prev => ({ ...prev, login: err.message }))
      })
  }


  return (
    <div className='flex items-center justify-center fixed w-screen h-screen bg-black bg-opacity-40 z-50'>
      <div className='bg-white shadow-2xl flex flex-col justify-center relative top-5 pt-16 pb-8 w-[350px] h-auto rounded-3xl px-6 z-50'>
        <i className='bx bx-x text-2xl opacity-60 font-bold cursor-pointer absolute right-5 top-4' onClick={() => hideLogin()}></i>
        {!createAccount ?
          // Login
          <div className='flex flex-col gap-0'>
            <div className='flex flex-col items-center mb-2'>
              <h1 className='text-4xl'>Welcome</h1>
              <p className='text-sm'>We are glad to see you join us!</p>
            </div>
            <div>
              <form onSubmit={handleSignInEmail}>
                <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.login}</span>
                <div className='relative mb-0'>
                  <i className='bx bx-user absolute text-2xl left-5 md:top-3 top-2'></i>
                  <input
                    type="text"
                    ref={inputRef}
                    className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
                    placeholder='Email'
                    onChange={handleEmailChange}
                  ></input>
                  <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.email}</span>
                </div>
                <div className='relative mb-4'>
                  <i className='bx bx-lock absolute text-2xl left-5 md:top-3 top-2'></i>
                  <input
                    type="password"
                    className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
                    placeholder='Password'
                    onChange={handlePasswordChange}
                  ></input>
                  <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.password}</span>
                  <div className='flex justify-end'>
                    <a>
                      <span className='text-[12px] text-blue-900 hover:text-blue-500 hover:underline mr-3'>Forgot Password?</span>
                    </a>
                  </div>
                </div>
                <div className='relative flex justify-center items-center flex-col'>
                  <button type='submit' className={classNames('w-52 py-3 bg-black text-white text-sm rounded-full', { 'opacity-50 bg-slate-500': isRequesting })} disabled={isRequesting}>Login</button>
                  <span className='text-[12px]'>Not registered yet? <a className='text-blue-900 hover:text-blue-500 hover:underline' onClick={() => {
                    setCreateAccount(true);
                    resetForm()
                  }}>Create an account.</a></span>
                </div>
              </form>
            </div>
            <div className='flex items-center w-full justify-evenly my-3'>
              <hr className='w-1/3' />
              <div className='text-nowrap'>or</div>
              <hr className='w-1/3' />
            </div>
            <div className='flex flex-col gap-4'>
              <div className='relative'>
                <button className='w-full py-3 border border-black rounded-full' onClick={handleSignInGoogle}>
                  <span>
                    <img className='absolute top-1/2 -translate-y-1/2 left-[74px]' src={googleLogo} alt="" />
                    <span className='pl-14 md:text-base text-sm'>Login with <span className='font-bold'>Google</span></span>
                  </span>
                </button>
              </div>
            </div>
          </div> :
          // Signup
          <div className=''>
            <h3 className='text-[28px] text-center mb-10'>Create Account</h3>
            <form onSubmit={handleSignUp}>
              <div className='relative '>
                <i className='bx bx-user absolute text-2xl left-5 md:top-3 top-2'></i>
                <input
                  type="text"
                  ref={inputRef}
                  className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
                  placeholder='Email'
                  onChange={handleEmailChange}
                ></input>
                <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.email}</span>
              </div>
              <div className='relative '>
                <i className='bx bx-lock absolute text-2xl left-5 md:top-3 top-2'></i>
                <input
                  type="password"
                  className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
                  placeholder='Password'
                  onChange={handlePasswordChange}
                ></input>
                <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.password}</span>
              </div>
              <div className='relative '>
                <i className='bx bx-lock absolute text-2xl left-5 md:top-3 top-2'></i>
                <input
                  type="password"
                  className='md:py-4 py-3 pl-[55px] min-w-60 w-full rounded-full placeholder:text-left placeholder:text-sm md:placeholder:text-base bg-background'
                  placeholder='Confirm Password'
                  onChange={handleCfPasswordChange}
                ></input>
                <span className='relative text-red-500 text-sm ml-4 inline-block -top-1'>{errorMessage.cfPassword}</span>
              </div>
              <div className='relative flex justify-center items-center flex-col mt-8 mb-5'>
                <button type='submit' className={classNames('w-52 py-3 bg-black text-white text-sm rounded-full', { 'opacity-50 bg-slate-500': isRequesting })} disabled={isRequesting}

                >Sign Up</button>
                <span className='text-[12px]'>Already have an account? <a className='text-blue-900 hover:text-blue-500 hover:underline' onClick={() => {
                  setCreateAccount(false)
                  resetForm()
                }
                }>Login</a></span>
              </div>
            </form>
          </div>}

      </div>
    </div>
  );
};

export default Login;
