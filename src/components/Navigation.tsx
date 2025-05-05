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
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  CurrencyExchange as CurrencyExchangeIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navigation: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = [
    { text: "HOME", icon: <HomeIcon />, path: "/" },
    {
      text: "EXCHANGE RATES (LIVE)",
      icon: <CurrencyExchangeIcon />,
      path: "/exchange-rates",
    },
    { text: "ABOUT", icon: <InfoIcon />, path: "/about" },
    { text: "ERROR PAGE", icon: <ErrorIcon />, path: "/error" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Loan Calculator
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex" }}>
            {menuItems.map((item) => (
              <Box
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "white",
                  textDecoration: "none",
                  mx: 1,
                  p: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 1,
                  },
                }}
              >
                {item.text}
              </Box>
            ))}
          </Box>
        )}

        <Switch
          checked={mode === "dark"}
          onChange={toggleTheme}
          color="default"
        />

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
