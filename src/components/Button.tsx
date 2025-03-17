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
        "rounded-full py-3 md:py-4 md:text-base text-sm transition-colors",
        {
          "opacity-50 bg-gray-500": disabled,
          "text-white bg-black hover:bg-gray-700": purpose === "primary",
          "bg-white text-black hover:bg-gray-100": purpose === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
