import React from "react";
import {
  FaUsers,
  FaFileArrowDown,
  FaFileArrowUp,
  FaFileLines,
} from "react-icons/fa6";
import { AiFillDashboard } from "react-icons/ai";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import NavLink from "./NavLink"; // Assuming you have a NavLink component similar to the one used earlier

const SideNav = () => {
  return (
    <Box
      className="bg-blue-600"
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* Logo and User Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 150,
          borderBottom: "2px dashed",
          borderColor: "grey.300",
          mb: 2,
        }}
      >
        {/* Replace Avatar src with your logo */}
        <Avatar sx={{ mb: 1 }}>L</Avatar>
        <Typography variant="h6">auth.user.name</Typography>
      </Box>

      {/* Navigation List */}
      <List>
        {/* Dashboard Link */}
        <ListItem disablePadding>
          <NavLink href="{route(prefix + 'dashboard')}" active={true}>
            <ListItemIcon>
              <AiFillDashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </NavLink>
        </ListItem>

        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Referrals
        </Typography>

        {/* Incoming Link */}
        <ListItem disablePadding>
          <NavLink href="{route('incoming')}" active={true}>
            <ListItemIcon>
              <FaFileArrowDown />
            </ListItemIcon>
            <ListItemText primary="Incoming" />
          </NavLink>
        </ListItem>

        {/* Outgoing Link */}
        <ListItem disablePadding>
          <NavLink href="{route('outgoing')}" active={true}>
            <ListItemIcon>
              <FaFileArrowUp />
            </ListItemIcon>
            <ListItemText primary="Outgoing" />
          </NavLink>
        </ListItem>

        {/* Files Link */}
        <ListItem disablePadding>
          <NavLink href="{route('files')}" active={true}>
            <ListItemIcon>
              <FaFileLines />
            </ListItemIcon>
            <ListItemText primary="Files" />
          </NavLink>
        </ListItem>
      </List>

      <Divider sx={{ mt: 3, mb: 2 }} />

      {/* Bottom Account Section */}
      <Box
        sx={{
          mt: "auto",
          p: 1,
          bgcolor: "grey.200",
          "&:hover": {
            bgcolor: "grey.300",
          },
          textAlign: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        <Typography variant="body2">Account</Typography>
      </Box>
    </Box>
  );
};

export default SideNav;
