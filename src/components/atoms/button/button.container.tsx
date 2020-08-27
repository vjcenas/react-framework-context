import React from 'react';

type IProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<IProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Button;
