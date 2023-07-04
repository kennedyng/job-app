import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <input
      className={`px-4 py-4 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-palette-blue ${className}`}
      {...rest}
    />
  );
};

export default Input;
