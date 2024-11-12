import React from "react";
import InputField from "../InputField";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";

interface CreateAccountFormProps {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCfPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: { email: string; password: string; cfPassword: string };
  isRequesting: boolean;
  setCreateAccount: (value: boolean) => void;
  resetForm: () => void;
}

const CreateAccountForm = ({
  handleSignUp,
  handleEmailChange,
  handlePasswordChange,
  handleCfPasswordChange,
  errorMessage,
  isRequesting,
  setCreateAccount,
  resetForm,
}: CreateAccountFormProps) => {
  return (
    <div className="">
      <h3 className="text-[28px] text-center mb-10">Create Account</h3>
      <form onSubmit={handleSignUp}>
        <InputField
          type="text"
          iconClass="bx bx-user"
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <ErrorMessage message={errorMessage.email} />
        <InputField
          type="password"
          iconClass="bx bx-lock"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <ErrorMessage message={errorMessage.password} />
        <InputField
          type="password"
          iconClass="bx bx-lock"
          placeholder="Confirm Password"
          onChange={handleCfPasswordChange}
        />
        <ErrorMessage message={errorMessage.cfPassword} />
        <div className="relative flex justify-center items-center flex-col mt-8 mb-5">
          <Button
            type="submit"
            className="w-52 text-sm"
            disabled={isRequesting}
          >
            Sign Up
          </Button>
          <span className="text-[12px]">
            Already have an account?{" "}
            <a
              className="text-blue-900 hover:text-blue-500 hover:underline"
              onClick={() => {
                setCreateAccount(false);
                resetForm();
              }}
            >
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;
