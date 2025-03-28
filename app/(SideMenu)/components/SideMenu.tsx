"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

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
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Apps", icon: <AppsIcon />, path: "/apps" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
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
          borderColor: "divider",
          top: isMobile ? 0 : 64,
          height: isMobile ? "100%" : "calc(100% - 64px)",
        },
      }}
      className={isMobile ? "" : "mt-16"}
    >
      {isMobile && <div className="h-16 bg-white" />}
      <List
        sx={{
          paddingTop: isMobile ? "0" : theme.spacing(1),
          "& .MuiListItemButton-root": {
            borderRadius: "12px",
            margin: "4px 8px",
            width: "calc(100% - 16px)",
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
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ListItemIcon
                  className={`${
                    pathname === item.path ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={`${
                    pathname === item.path ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
