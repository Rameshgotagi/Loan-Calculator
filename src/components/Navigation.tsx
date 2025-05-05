import type React from "react";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { text: "HOME", path: "/" },
  { text: "EXCHANGE RATES (LIVE)", path: "/exchange-rates" },
  { text: "ABOUT", path: "/about" },
  { text: "ERROR PAGE", path: "/error" },
];

const Navigation: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ["Tab", "Shift"].includes((event as React.KeyboardEvent).key)
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const renderNavItems = (isDrawer = false) =>
    menuItems.map(({ text, path }) => {
      const isActive = location.pathname === path;
      const commonStyles = {
        bgcolor: isActive
          ? isDrawer
            ? "primary.main"
            : "rgba(255, 255, 255, 0.1)"
          : "transparent",
        color: isDrawer ? "text.primary" : "white",
        textDecoration: "none",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.1)",
        },
      };

      return isDrawer ? (
        <ListItem
          key={text}
          component={Link}
          to={path}
          sx={commonStyles}
          onClick={() => setDrawerOpen(false)}
        >
          <ListItemText primary={text} />
        </ListItem>
      ) : (
        <Box
          key={text}
          component={Link}
          to={path}
          sx={{ ...commonStyles, p: "5px 20px", mx: 1 }}
        >
          <Typography variant="subtitle1">{text}</Typography>
        </Box>
      );
    });

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        {!isMobile && <Box sx={{ display: "flex" }}>{renderNavItems()}</Box>}

        <Switch
          checked={mode === "dark"}
          onChange={toggleTheme}
          color="default"
        />

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, pl: "10px" }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>{renderNavItems(true)}</List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
