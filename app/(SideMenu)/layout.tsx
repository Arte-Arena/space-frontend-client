"use client";

import { useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DRAWER_WIDTH = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(!isMobile);

  const handleMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleClose = () => {
    if (isMobile) {
      setIsSideMenuOpen(false);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50">
      <Header onMenuToggle={handleMenuToggle} />
      <SideMenu
        isOpen={isSideMenuOpen}
        drawerWidth={DRAWER_WIDTH}
        onClose={handleClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: isMobile ? 0 : isSideMenuOpen ? `${DRAWER_WIDTH}px` : 0,
          width: isMobile
            ? "100%"
            : `calc(100% - ${isSideMenuOpen ? DRAWER_WIDTH : 0}px)`,
          "& > *": {
            borderRadius: "16px",
            backgroundColor: "white",
            padding: theme.spacing(3),
            margin: theme.spacing(2),
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
          },
        }}
        className="pt-16 px-2 sm:px-6"
      >
        {children}
      </Box>
    </Box>
  );
}
