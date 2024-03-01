import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface ButtonTransferProps extends ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonTransfer: React.FC<ButtonTransferProps> = ({
  label,
  onClick,
  ...props
}) => {
  return (
    <Button onClick={onClick} {...props}>
      {label}
    </Button>
  );
};

export default ButtonTransfer;
