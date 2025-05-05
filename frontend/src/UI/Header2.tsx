import React from "react";

interface Header2Props {
  children: React.ReactNode;
  className?: string;
}

const Header2: React.FC<Header2Props> = ({ children, className = "" }) => {
  return <h3 className={`${className}`}>{children}</h3>;
};

export default Header2;
