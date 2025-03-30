import { styled } from "@mui/material/styles";

export const UnderlineText = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
  // Pseudo-element to underlirne
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: "0.1px",
    backgroundColor: theme.palette.common.black,
    transition: "width 0.3s ease",
  },
  // on hover left to right
  "&:hover::after": {
    width: "100%",
  },
}));
