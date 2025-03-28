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
    <Box className="min-h-screen bg-white">
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
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standard,
          }),
          marginLeft: isMobile ? 0 : isSideMenuOpen ? `${DRAWER_WIDTH}px` : 0,
          width: isMobile
            ? "100%"
            : `calc(100% - ${isSideMenuOpen ? DRAWER_WIDTH : 0}px)`,
          marginTop: "55px",
          background: "#ffffff",
          "& > *": {
            backgroundColor: "rgb(250, 251, 252)",
            minHeight: "100vh",
            margin: 0,
            padding: theme.spacing(3),
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
