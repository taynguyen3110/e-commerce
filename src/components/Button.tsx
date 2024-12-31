import React from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  purpose?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  purpose = "primary",
  onClick,
  disabled = false,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "rounded-full py-3 md:py-4 md:text-base text-sm",
        {
          "opacity-50 bg-slate-500": disabled,
          "text-white bg-black": purpose === "primary",
          "bg-white text-black": purpose === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
