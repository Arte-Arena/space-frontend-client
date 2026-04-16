"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Customizer from "./layout/shared/customizer/Customizer";
import Navigation from "./layout/horizontal/navbar/Navigation";
import HorizontalHeader from "./layout/horizontal/header/Header";
import { useSelector } from "@/store/hooks";
import { AppState } from "@/store/store";
import { checkAuth } from "@/services/auth";
import Loading from "@/app/loading";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        await checkAuth(router);

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false);
          router.replace("/auth/auth1/login");
        }
      } finally {
        if (isMounted) {
          setIsAuthChecking(false);
        }
      }
    };

    validateSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isAuthChecking) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Loading />;
  }

  return (
    <MainWrapper
      className={
        customizer.activeMode === "dark" ? "darkbg mainwrapper" : "mainwrapper"
      }
    >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      {customizer.isHorizontal ? "" : <Sidebar />}
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {/* PageContent */}
        {customizer.isHorizontal ? <Navigation /> : ""}
        <Container
          sx={{
            pt: "20px",
            px: "24px",
            maxWidth: "100%!important",
            width: "100%",
          }}
          disableGutters
        >
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: "calc(100vh - 170px)", width: "100%" }}>
            {/* <Outlet /> */}
            {children}
            {/* <Index /> */}
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        <Customizer />
      </PageWrapper>
    </MainWrapper>
  );
}
