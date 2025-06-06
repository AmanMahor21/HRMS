import React, { ReactNode } from "react";
import "../assets/css/login.css";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className="main-container">
      {/* <div className="logo">
        <img
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?t=st=1746284430~exp=1746288030~hmac=f09d89db634bd54cac3020b93724317b48dc3c693c527781d38f099b5b01f870&w=826"
          alt="Logo"
        />ssssssssssssss
      </div>sss */}
      <div className="logo-wrapper-auth">
        <div className="auth-logo-icon"></div>
        <div className="auth-logo">Logo</div>
      </div>
      <div className="login-container">
        <div className="left-side">
          <img src="/Rectangle.svg" alt=""/>
        </div>
        <div className="right-side">
          <form className="auth-form">{children}</form>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
