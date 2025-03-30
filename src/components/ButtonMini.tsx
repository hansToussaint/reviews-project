import React from "react";
import { Button, ButtonProps } from "@mui/material";

import theme from "../styles/Theme";

interface ButtonMiniProps extends ButtonProps {
  bgColor?: string;
  textColor?: string;
  BgHover?: string;
}

const ButtonMini: React.FC<ButtonMiniProps> = ({
  bgColor,
  textColor,
  BgHover,
  sx,
  ...props
}) => {
  return (
    <Button
      disableRipple
      variant="contained"
      sx={{
        backgroundColor: bgColor,
        color: textColor || theme.palette.text.primary,
        border: "none",
        padding: "3px 9px",
        borderRadius: 1,
        boxShadow: 0,
        textTransform: "none",
        fontSize: "1.4rem",
        fontWeight: 350,
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&:hover": {
          backgroundColor: BgHover ? BgHover : bgColor,
          boxShadow: 0,
        },
        ...sx, // to add other style via props
      }}
      {...props}
    />
  );
};

export default ButtonMini;
