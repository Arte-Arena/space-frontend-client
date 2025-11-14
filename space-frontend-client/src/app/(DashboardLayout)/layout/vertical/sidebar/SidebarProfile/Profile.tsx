import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "@/store/hooks";
import { IconPower } from "@tabler/icons-react";
import { AppState } from "@/store/store";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import { useEffect, useState } from "react";
import { getClientData, ClientData } from "@/services/account-settings";

export const Profile = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const router = useRouter();
  const [clientData, setClientData] = useState<ClientData | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const data = await getClientData(router);
        setClientData(data);
      } catch (error) {
        console.error("Erro ao carregar dados do cliente no sidebar:", error);
      }
    };

    fetchClientData();
  }, [router]);

  const handleLogout = async () => {
    await logout(router);
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar
            alt="Profile"
            src={"/images/profile/user-1.jpg"}
            sx={{ height: 40, width: 40 }}
          />

          <Box>
            <Typography variant="h6">
              {clientData?.contact?.name || "User"}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                onClick={handleLogout}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
