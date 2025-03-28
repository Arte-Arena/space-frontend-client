"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

interface SideMenuProps {
  isOpen: boolean;
  drawerWidth: number;
  onClose?: () => void;
}

export default function SideMenu({
  isOpen,
  drawerWidth,
  onClose,
}: SideMenuProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    {
      text: "Uniformes",
      icon: <CheckroomOutlinedIcon />,
      path: "/apps/uniforms",
    },
    { text: "Configurações", icon: <SettingsIcon />, path: "/apps/configs" },
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          borderRight: "1px solid",
          borderColor: "rgba(0, 0, 0, 0.06)",
          top: isMobile ? 0 : 64,
          height: isMobile ? "100%" : "calc(100% - 64px)",
        },
      }}
      className={isMobile ? "" : "mt-16"}
    >
      {isMobile && (
        <Box className="h-16 bg-white flex items-center px-4">
          <Image
            src="/arte_arena_light.png"
            alt="Arte Arena Logo"
            width={100}
            height={28}
            className="object-contain"
            priority
          />
        </Box>
      )}
      <List
        sx={{
          paddingTop: isMobile ? "0" : theme.spacing(2),
          "& .MuiListItemButton-root": {
            borderRadius: "12px",
            margin: "4px 12px",
            width: "calc(100% - 24px)",
            transition: "all 0.2s ease-in-out",
          },
          "& .MuiListItemIcon-root": {
            minWidth: "32px",
            "& .MuiSvgIcon-root": {
              fontSize: "1.35rem",
              stroke: "currentColor",
              strokeWidth: 0.4,
            },
          },
          "& .MuiTypography-root": {
            fontWeight: 400,
            fontSize: "0.9rem",
            letterSpacing: "0.01em",
            color: "rgb(75, 85, 99)",
          },
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              href={item.path}
              style={{
                width: "100%",
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={isMobile ? onClose : undefined}
            >
              <ListItemButton
                className={`${
                  pathname === item.path
                    ? "bg-blue-50/60 text-blue-600/90 hover:bg-blue-50/80"
                    : "text-gray-500 hover:bg-gray-50/60"
                } transition-all duration-200`}
                sx={{
                  paddingLeft: "16px",
                }}
              >
                <ListItemIcon
                  className={`${
                    pathname === item.path
                      ? "text-blue-500/90"
                      : "text-gray-400"
                  } transition-colors duration-200`}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={`${
                    pathname === item.path
                      ? "text-blue-600/90"
                      : "text-gray-500"
                  } transition-colors duration-200`}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: pathname === item.path ? 500 : 400,
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
