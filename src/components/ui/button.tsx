import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, onClick, disabled }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-700 text-white px-4 py-3 rounded-md cursor-pointer inline-block disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
