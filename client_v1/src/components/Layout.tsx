import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Badge,
  IconButton,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifier from "./notifier";

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const drawerWidth = 200;

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [notification, setNotification] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: "100%", bgcolor: "primary.main", color: "white" }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          My App
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemText primary="User Management" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/settings">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2 }}>
        <Button variant="contained" color="error" fullWidth onClick={onLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Sidebar */}
      {isSmallScreen ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "primary.main",
              color: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isSmallScreen ? 0 : `${drawerWidth}px`,
          pt: "64px", // AppBar height
          height: "100%",
          overflow: "auto",
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Header */}
        <AppBar
          position="fixed"
          sx={{
            width: isSmallScreen ? "100%" : `calc(100% - ${drawerWidth}px)`,
            ml: isSmallScreen ? 0 : `${drawerWidth}px`,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {isSmallScreen && (
                <Button color="inherit" onClick={handleDrawerToggle}>
                  Menu
                </Button>
              )}
              <Typography variant="h6" noWrap component="div">
                Dashboard
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Notifier setOnline={setIsOnline} setNotification={setNotification} />

              <IconButton color="inherit">
                <Badge badgeContent={notification} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: isOnline ? "green" : "grey",
                    border: "2px solid white",
                  }}
                />
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;