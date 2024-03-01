import { Box } from "@mui/material";
import React, { ReactNode, FC } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        gridArea: "main",
        margin: "0 8px",
        backgroundColor: "#ffffff",
        border: "1px solid #bdbdbd",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </Box>
  );
};
export default Container;
