import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../shared/context/UserAuthContext";
import classNames from "classnames";
import { notify } from "../../utils/notify";
import { useShoppingCart } from "../../shared/context/ShoppingCartContext";
import { saveUserToDB } from "../../services/userServices";
import { motion } from "framer-motion";
import Modal from "./Modal";
import ErrorMessage from "../ErrorMessage";
import InputField from "../InputField";
import Button from "../Button";
import LoginForm from "./LoginForm";
import CreateAccountForm from "./CreateAccountForm";

interface LoginProps {
  hideLogin: () => void;
  createAcc: boolean;
}

interface ErrorMessage {
  email: string;
  password: string;
  login: string;
  cfPassword: string;
}

const Login = ({ hideLogin, createAcc }: LoginProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [createAccount, setCreateAccount] = useState<boolean>(createAcc);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cfPassword, setCfPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    email: "",
    password: "",
    login: "",
    cfPassword: "",
  });

  const {
    signUp,
    signInWithEmail,
    signInWithGoogle,
    resetPassword,
    changePassword,
    signOut,
    user,
  } = useUserAuth();
  const { cartItems, setCartItems } = useShoppingCart();

  useEffect(() => {
    inputRef.current ? inputRef.current.focus() : null;
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCfPassword(e.target.value);
  };

  const validateInput = () => {
    setErrorMessage({ email: "", password: "", login: "", cfPassword: "" });
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, email: "" }));
    }

    if (password.length < 6) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }

    if (createAccount) {
      if (password != cfPassword) {
        setErrorMessage((prev) => ({
          ...prev,
          cfPassword: "Password does not match.",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, cfPassword: "" }));
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setCfPassword("");
    setErrorMessage({ email: "", password: "", login: "", cfPassword: "" });
  };

  const handleSignInEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateInput();

    if (
      email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
      password.length >= 6 &&
      email != "" &&
      password != ""
    ) {
      setIsRequesting(true);
      await signInWithEmail(email, password)
        .then((userCre) => {
          saveUserToDB(userCre.user, cartItems, setCartItems);
          notify("success", "Signed in with Email successfully!");
          setIsRequesting(false);
          hideLogin();
        })
        .catch((err) => {
          setIsRequesting(false);
          setErrorMessage((prev) => ({ ...prev, login: err.message }));
        });
    }
  };

  const handleSignInGoogle = () => {
    setIsRequesting(true);
    signInWithGoogle()
      .then((userCre) => {
        saveUserToDB(userCre.user, cartItems, setCartItems);
        notify("success", "Signed in with Google successfully!");
        setIsRequesting(false);
        hideLogin();
      })
      .catch((err) => {
        setIsRequesting(false);
        setErrorMessage((prev) => ({ ...prev, login: err.message }));
      });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInput();
    setIsRequesting(true);

    signUp(email, password)
      .then(() => {
        notify("success", "Account Created!");
        setIsRequesting(false);
        setCreateAccount(false);
      })
      .catch((err) => {
        setIsRequesting(false);
        setErrorMessage((prev) => ({ ...prev, login: err.message }));
        console.log(err.message);
      });
  };

  return (
    <Modal onClose={hideLogin}>
      {!createAccount ? (
        <LoginForm
          handleSignInEmail={handleSignInEmail}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleSignInGoogle={handleSignInGoogle}
          errorMessage={errorMessage}
          isRequesting={isRequesting}
          setCreateAccount={setCreateAccount}
          resetForm={resetForm}
        />
      ) : (
        <CreateAccountForm
          handleSignUp={handleSignUp}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleCfPasswordChange={handleCfPasswordChange}
          errorMessage={errorMessage}
          isRequesting={isRequesting}
          setCreateAccount={setCreateAccount}
          resetForm={resetForm}
        />
      )}
    </Modal>
  );
};

export default Login;
