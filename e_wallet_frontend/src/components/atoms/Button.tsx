import React, { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

interface ButtonComponentProps extends ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  type = "button",
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
