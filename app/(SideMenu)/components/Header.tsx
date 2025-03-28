"use client";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "background.paper",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        borderRadius: 0,
      }}
      className="border-b border-gray-200"
    >
      <Toolbar className="justify-between px-2 sm:px-4">
        <div className="flex items-center">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            className="text-gray-700 rounded-xl"
            size={isMobile ? "medium" : "large"}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              borderRadius: "12px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            className="ml-2 sm:ml-4 text-gray-800 font-medium truncate max-w-[150px] sm:max-w-none"
          >
            Space Client
          </Typography>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <IconButton
            className="text-gray-700 p-2 sm:p-3 rounded-xl"
            size={isMobile ? "small" : "medium"}
            sx={{
              borderRadius: "12px",
            }}
          >
            <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <Avatar
            className="bg-blue-500 cursor-pointer hover:opacity-80"
            sx={{
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
              borderRadius: "14px",
            }}
          >
            U
          </Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
}
