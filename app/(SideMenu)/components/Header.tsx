"use client";

import {
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
  useMediaQuery,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

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
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        borderRadius: 0,
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        width: isMobile ? "100%" : `calc(100%)`,
        "& .MuiSvgIcon-root": {
          color: "rgba(55, 65, 81, 0.7)",
        },
      }}
      className="border-b border-gray-100"
    >
      <Toolbar className="justify-between px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={onMenuToggle}
            className="text-gray-600 rounded-xl hover:bg-gray-50/80"
            size={isMobile ? "medium" : "large"}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.03)",
              },
              borderRadius: "12px",
            }}
          >
            <MenuIcon className="text-gray-500" />
          </IconButton>
          <div className="sm:block h-8 w-auto relative">
            <Image
              src="/arte_arena_light.png"
              alt="Arte Arena Logo"
              width={120}
              height={32}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <IconButton
            className="text-gray-600 rounded-xl hover:bg-gray-50/80 transition-colors"
            size={isMobile ? "small" : "medium"}
            sx={{
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.03)",
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ef4444",
                },
              }}
            >
              <NotificationsIcon
                fontSize={isMobile ? "small" : "medium"}
                className="text-gray-500"
              />
            </Badge>
          </IconButton>
          <Avatar
            className="bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer transition-opacity"
            sx={{
              width: isMobile ? 32 : 38,
              height: isMobile ? 32 : 38,
              borderRadius: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            U
          </Avatar>
        </div>
      </Toolbar>
    </AppBar>
  );
}
