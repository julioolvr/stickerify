import React from "react";

function Button(props) {
  const { className, ...otherProps } = props;
  return (
    <button className={`${buttonStyles} ${className || ""}`} {...otherProps} />
  );
}

export default Button;

export const buttonStyles = "rounded bg-purple-300 p-6 text-center";
