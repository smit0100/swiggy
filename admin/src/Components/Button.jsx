import React from "react";

const Button = ({
  icon,
  disabled,
  bgColor,
  onClick,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
