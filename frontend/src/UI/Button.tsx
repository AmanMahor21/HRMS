import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "btn",
  ...rest
}) => {
  return (
    <button className={` ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
