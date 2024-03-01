import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface ButtonTopUpProps extends ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonTopUp: React.FC<ButtonTopUpProps> = ({
  label,
  onClick,
  ...props
}) => {
  return <Button onClick={onClick} {...props}>{label}</Button>;
};

export default ButtonTopUp;
