"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { IconShoppingCart, IconCheck } from "@tabler/icons-react";
import Image from "next/image";

interface WelcomeCardProps {
  clientName?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ clientName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Simulate fetch data from an API
    setTimeout(() => {
      setPendingOrders(2);
      setCompletedOrders(3);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        py: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm={6} display="flex" alignItems="center">
            <Box sx={{ width: "100%" }}>
              <Box
                gap="16px"
                mb={5}
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  alignItems: "center",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    src="/images/profile/user-1.jpg"
                    alt="img"
                    sx={{ width: 40, height: 40 }}
                  />
                )}
                <Typography
                  variant="h5"
                  sx={{
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  {isLoading ? (
                    <Skeleton variant="text" width={250} height={32} />
                  ) : (
                    `Bem-vindo de volta, ${clientName || "Usuário"}!`
                  )}
                </Typography>
              </Box>

              <Stack
                mt={8}
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                divider={
                  <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                  />
                }
                sx={{ mb: { xs: 2, sm: 0 } }}
              >
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">
                    {isLoading ? (
                      <Skeleton variant="text" width={40} height={45} />
                    ) : (
                      <>
                        {pendingOrders}{" "}
                        <span>
                          <IconShoppingCart width={18} color="#39B69A" />
                        </span>
                      </>
                    )}
                  </Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">
                    {isLoading ? (
                      <Skeleton variant="text" width={120} height={24} />
                    ) : (
                      "Pedidos Pendentes"
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">
                    {isLoading ? (
                      <Skeleton variant="text" width={40} height={45} />
                    ) : (
                      <>
                        {completedOrders}
                        <span>
                          <IconCheck width={18} color="#39B69A" />
                        </span>
                      </>
                    )}
                  </Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">
                    {isLoading ? (
                      <Skeleton variant="text" width={130} height={24} />
                    ) : (
                      "Pedidos Concluídos"
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
          {!isMobile && (
            <Grid item sm={6}>
              <Box
                sx={{
                  width: "340px",
                  height: "246px",
                  position: "absolute",
                  right: "-26px",
                  bottom: "-70px",
                  marginTop: "20px",
                }}
              >
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={340}
                    height={250}
                    animation="wave"
                  />
                ) : (
                  <Image
                    src="/images/backgrounds/welcome-bg2.png"
                    alt="img"
                    width={340}
                    height={250}
                  />
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
