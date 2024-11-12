import React, { useRef } from "react";
import googleLogo from "../../assets/icons/google-login.png";
import InputField from "../InputField";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

interface LoginFormProps {
  handleSignInEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignInGoogle: () => void;
  errorMessage: { login: string; email: string; password: string };
  isRequesting: boolean;
  setCreateAccount: (value: boolean) => void;
  resetForm: () => void;
}

const LoginForm = ({
  handleSignInEmail,
  handleEmailChange,
  handlePasswordChange,
  handleSignInGoogle,
  errorMessage,
  isRequesting,
  setCreateAccount,
  resetForm,
}: LoginFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-col items-center mb-2">
        <h1 className="text-4xl">Welcome</h1>
        <p className="text-sm">We are glad to see you join us!</p>
      </div>
      <div>
        <form onSubmit={handleSignInEmail}>
          <ErrorMessage message={errorMessage.login} />
          <InputField
            type="text"
            iconClass="bx bx-user"
            placeholder="Email"
            onChange={handleEmailChange}
            inputRef={inputRef}
          />
          <ErrorMessage message={errorMessage.email} />
          <InputField
            type="password"
            iconClass="bx bx-lock"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
          <ErrorMessage message={errorMessage.password} />
          <div className="flex justify-end">
            <a>
              <span className="text-[12px] text-blue-900 hover:text-blue-500 hover:underline mr-3">
                Forgot Password?
              </span>
            </a>
          </div>
          <div className="relative flex justify-center items-center flex-col mt-8 mb-5">
            <Button
              type="submit"
              className="w-52 text-sm"
              disabled={isRequesting}
            >
              Login
            </Button>
            <span className="text-[12px]">
              Not registered yet?{" "}
              <a
                className="text-blue-900 hover:text-blue-500 hover:underline"
                onClick={() => {
                  setCreateAccount(true);
                  resetForm();
                }}
              >
                Create an account.
              </a>
            </span>
          </div>
        </form>
      </div>
      <div className="flex items-center w-full justify-evenly my-3">
        <hr className="w-1/3" />
        <div className="text-nowrap">or</div>
        <hr className="w-1/3" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Button
            purpose="secondary"
            className="w-full border border-black"
            onClick={handleSignInGoogle}
          >
            <span>
              <img
                className="absolute top-1/2 -translate-y-1/2 left-[74px]"
                src={googleLogo}
                alt=""
              />
              <span className="pl-14 md:text-base text-sm">
                Login with <span className="font-bold">Google</span>
              </span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
