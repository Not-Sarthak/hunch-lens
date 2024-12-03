'use client';

import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn shadow-custom flex items-center justify-center space-x-2 ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Button;
