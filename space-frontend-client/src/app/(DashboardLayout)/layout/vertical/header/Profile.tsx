import React, { useState, useEffect } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";

import { IconMail } from "@tabler/icons-react";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { getClientData, ClientData } from "@/services/account-settings";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();
  const [clientData, setClientData] = useState<ClientData | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientData(router);
        setClientData(data);
      } catch (error) {
        console.error("Erro ao carregar dados do cliente no header:", error);
      }
    };

    fetchClientData();
  }, [router]);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    setAnchorEl2(null);
    await logout(router);
  };

  return (
    <Box>
      <IconButton
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/profile/user-1.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box p={2} pt={1}>
          <Stack direction="row" py={1} alignItems="center">
            <Box display="flex" alignItems="center">
              <Avatar
                src={"/images/profile/user-1.jpg"}
                alt={"ProfileImg"}
                sx={{ width: 54, height: 54 }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                  {clientData?.contact?.name || "User"}
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  {clientData?.contact?.email || "example@email.com"}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Divider />
          <Box pt={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
