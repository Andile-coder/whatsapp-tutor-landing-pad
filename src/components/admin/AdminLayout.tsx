import { useMemo, useState } from "react";
import { Link as RouterLink, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logoutAdminSession,
  logoutAllAdminSessions,
} from "@/store/slices/adminAuthSlice";

const drawerWidth = 288;

const navItems = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: <DashboardRoundedIcon fontSize="small" />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <GroupRoundedIcon fontSize="small" />,
  },
  {
    label: "Post paper",
    to: "/admin/papers/new",
    icon: <UploadFileRoundedIcon fontSize="small" />,
  },
  {
    label: "Account",
    to: "/admin/account",
    icon: <PersonRoundedIcon fontSize="small" />,
  },
  {
    label: "Security",
    to: "/admin/security",
    icon: <ShieldRoundedIcon fontSize="small" />,
  },
];

const drawerPaperSx = {
  width: drawerWidth,
  boxSizing: "border-box",
  border: "none",
  background:
    "linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(17,24,39,1) 100%)",
  color: "#e5e7eb",
  p: 2,
};

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { adminUser, logoutStatus } = useAppSelector((state) => state.adminAuth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const fullName =
    [adminUser?.first_name, adminUser?.last_name].filter(Boolean).join(" ") ||
    "Admin user";

  const currentSection = useMemo(() => {
    const matchedItem = [...navItems]
      .sort((a, b) => b.to.length - a.to.length)
      .find((item) =>
        item.to === "/admin"
          ? location.pathname === "/admin"
          : location.pathname.startsWith(item.to)
      );

    return matchedItem?.label || "Dashboard";
  }, [location.pathname]);

  const handleLogout = async () => {
    const result = await dispatch(logoutAdminSession());

    if (logoutAdminSession.fulfilled.match(result)) {
      navigate("/admin/login", { replace: true });
    }
  };

  const handleLogoutAll = async () => {
    await dispatch(logoutAllAdminSessions());
  };

  const drawerContent = (
    <Stack sx={{ height: "100%" }}>
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
        sx={{
          px: 1,
          py: 1.5,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: "rgba(255,255,255,0.12)",
            color: "white",
            fontWeight: 700,
          }}
        >
          MA
        </Avatar>
        <Box>
          <Typography
            variant="caption"
            sx={{ color: "rgba(226,232,240,0.7)", letterSpacing: "0.18em" }}
          >
            MOSA AI
          </Typography>
          <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
            Admin
          </Typography>
        </Box>
      </Stack>

      <List sx={{ mt: 3, gap: 0.5, display: "grid" }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            selected={
              item.to === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.to)
            }
            sx={{
              borderRadius: 3,
              color: "rgba(226,232,240,0.85)",
              "&.active, &.Mui-selected": {
                bgcolor: "white",
                color: "#0f172a",
                "& .MuiListItemIcon-root": {
                  color: "#0f172a",
                },
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto" }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "rgba(226,232,240,0.65)", letterSpacing: "0.16em" }}
          >
            SIGNED IN
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 600, color: "white" }}>
            {fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.7)" }}>
            {adminUser?.phone_number || "Unknown number"}
          </Typography>
        </Box>

        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleLogoutAll}
            sx={{
              borderRadius: 3,
              borderColor: "rgba(255,255,255,0.12)",
              color: "white",
              py: 1.4,
              "&:hover": {
                borderColor: "rgba(255,255,255,0.2)",
                bgcolor: "rgba(255,255,255,0.04)",
              },
            }}
          >
            Log out all sessions
          </Button>
          <Button
            variant="contained"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            disabled={logoutStatus === "loading"}
            sx={{
              borderRadius: 3,
              py: 1.4,
              bgcolor: "white",
              color: "#0f172a",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#e2e8f0",
                boxShadow: "none",
              },
            }}
          >
            {logoutStatus === "loading" ? "Logging out..." : "Log out"}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#eef2f7",
        background:
          "linear-gradient(180deg, #dfe7f1 0%, #f8fafc 20%, #f8fafc 100%)",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: "rgba(248,250,252,0.82)",
          color: "#0f172a",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(148,163,184,0.18)",
        }}
      >
        <Toolbar sx={{ minHeight: 78 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                letterSpacing: "0.16em",
                fontWeight: 700,
              }}
            >
              ADMIN WORKSPACE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {currentSection}
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            endIcon={<LaunchRoundedIcon />}
            sx={{
              borderRadius: 999,
              borderColor: "rgba(148,163,184,0.35)",
              color: "#334155",
              px: 2,
            }}
          >
            Public site
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": drawerPaperSx,
            }}
          >
            {drawerContent}
          </Drawer>

          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", lg: "block" },
              "& .MuiDrawer-paper": drawerPaperSx,
            }}
          >
            {drawerContent}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            px: { xs: 2, md: 3, lg: 4 },
            py: { xs: 12, md: 13 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
