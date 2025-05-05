import React from "react";
import { Link } from "react-router-dom";

interface TextLinkProps {
  textBefore?: string;
  linkText: string;
  to: string;
}

const TextLink: React.FC<TextLinkProps> = ({ textBefore, linkText, to }) => {
  return (
    <p className="gray-text">
      {textBefore && <span>{textBefore} </span>}
      <Link to={to} className="purple-link">
        {linkText}
      </Link>
    </p>
  );
};

export default TextLink;
