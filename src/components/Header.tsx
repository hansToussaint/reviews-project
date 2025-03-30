import React from "react";
import { useMediaQuery } from "@mui/material";

import theme from "../styles/Theme";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const Header: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
