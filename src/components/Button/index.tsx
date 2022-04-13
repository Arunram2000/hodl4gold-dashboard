import React, { ButtonHTMLAttributes, ReactNode } from "react";

import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error";
  children: ReactNode;
}

const getClassName = (variant: string) => {
  switch (variant) {
    case "secondary":
      return "btn-secondary";
    case "error":
      return "btn-error";
    default:
      return "btn-primary";
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  ...rest
}) => {
  return (
    <button className={`${className} ${getClassName(variant)}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
