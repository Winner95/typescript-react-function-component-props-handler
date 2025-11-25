import * as React from 'react';

/** Props for the Button component */
type ButtonProps = {
  /** Text to show inside the button */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
};

/** A simple button component */
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
