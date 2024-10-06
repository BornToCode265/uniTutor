import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Toolbar,
  Divider,
  Button,
  Avatar,
  Switch, // Import the Switch component for the toggle
  FormControlLabel, // For a labeled switch
} from "@mui/material";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

export default function TopBar({
  drawerWidth,
  handleDrawerToggle,
  handleMenu,
  anchorEl,
  handleClose,
}) {
  return (
    <AppBar
      position="fixed"
      className="shadow-none bg-transparent"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backdropFilter: "blur(2px)",
      }}
    >
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <HiOutlineMenuAlt1 />
        </IconButton>

        <Divider
          className="m-4 border-bd"
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <div>
          <IconButton
            className="text-front"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <Avatar alt="{auth.user.name}" src="{auth.user.profile_photo}" />
          </IconButton>
          {/* <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link
                                className="px-4  text-gray-700"
                                href='{route("profile.edit")}'
                            >
                                Profile
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link
                                className="px-4 text-gray-700"
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Link>
                        </MenuItem>

                        <Divider />
                    </Menu> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
