import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SideNav from "../Components/SideNav";
import TopBar from "../Components/TopBar";

const drawerWidth = 258;

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className="bg-background" sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          handleMenu={handleMenu}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                height: "100vh",
              },
            }}
          >
            <SideNav width={drawerWidth} />
          </Drawer>
          <Paper
            variant="permanent"
            className="fixed h-screen"
            sx={{
              boxSizing: "border-box",
              borderRight: "2px dashed rgb(var(--border))",
              backgroundColor: "rgb(var(--background))",
              width: drawerWidth,
              height: "100vh",
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {},
            }}
            open
          >
            <SideNav width={drawerWidth} />
          </Paper>
        </Box>
        <Box
          component="main"
          className="flex-1 px-12 py-16 mt-8 min-h-screen"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${258}px)` },
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
