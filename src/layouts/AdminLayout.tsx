import { useState } from "react";
import { Link as RouterLink, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardCommandKeyRoundedIcon from "@mui/icons-material/KeyboardCommandKeyRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AdminThemeProvider from "@/app/providers/AdminThemeProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logoutAdminSession,
  logoutAllAdminSessions,
} from "@/features/auth/store/adminAuthSlice";

const drawerWidth = 288;

const navSections = [
  {
    title: "Operations",
    accent: {
      soft: "#ecfdf3",
      strong: "#027a48",
    },
    items: [
      {
        label: "Dashboard",
        to: "/admin",
        icon: <DashboardRoundedIcon fontSize="small" />,
      },
      {
        label: "Support inbox",
        to: "/admin/support",
        icon: <ForumRoundedIcon fontSize="small" />,
        badge: "Live",
      },
      {
        label: "Notes",
        to: "/admin/support/notes",
        icon: <ForumRoundedIcon fontSize="small" />,
      },
      {
        label: "Contacts",
        to: "/admin/support/contacts",
        icon: <PersonRoundedIcon fontSize="small" />,
      },
      {
        label: "Users",
        to: "/admin/users",
        icon: <GroupRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    title: "Documents",
    accent: {
      soft: "#f2f7ff",
      strong: "#3641f5",
    },
    items: [
      {
        label: "Post paper",
        to: "/admin/papers/new",
        icon: <UploadFileRoundedIcon fontSize="small" />,
      },
      {
        label: "Analyze paper",
        to: "/admin/papers/analyze",
        icon: <AutoAwesomeRoundedIcon fontSize="small" />,
      },
      {
        label: "Document activity",
        to: "/admin/document-activity",
        icon: <InsightsRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    title: "Support Ops",
    accent: {
      soft: "#fff6ed",
      strong: "#b54708",
    },
    items: [
      {
        label: "Macros",
        to: "/admin/support/macros",
        icon: <AutoAwesomeRoundedIcon fontSize="small" />,
      },
      {
        label: "Reports",
        to: "/admin/support/reports",
        icon: <InsightsRoundedIcon fontSize="small" />,
      },
    ],
  },
  {
    title: "Workspace",
    accent: {
      soft: "#f5f3ff",
      strong: "#6e59d9",
    },
    items: [
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
    ],
  },
];

const drawerPaperSx = {
  width: drawerWidth,
  boxSizing: "border-box",
  border: "none",
  borderRight: "1px solid #e4e7ec",
  background: "#ffffff",
  color: "#344054",
  p: 2.5,
};

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutStatus } = useAppSelector((state) => state.adminAuth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Operations: true,
    Documents: true,
    "Support Ops": true,
    Workspace: true,
  });

  const handleLogout = async () => {
    const result = await dispatch(logoutAdminSession());

    if (logoutAdminSession.fulfilled.match(result)) {
      navigate("/admin/login", { replace: true });
    }
  };

  const handleLogoutAll = async () => {
    await dispatch(logoutAllAdminSessions());
  };

  const toggleSection = (title: string) => {
    setOpenSections((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const drawerContent = (
    <Stack sx={{ height: "100%", gap: 2 }}>
      <Divider />

      <Stack spacing={2.75} sx={{ overflowY: "auto", pr: 0.5 }}>
        {navSections.map((section) => (
          <Box key={section.title}>
            <ListItemButton
              onClick={() => toggleSection(section.title)}
              sx={{
                minHeight: 38,
                px: 1.5,
                borderRadius: 0,
                color: section.accent.strong,
                bgcolor: section.accent.soft,
                border: "1px solid #e4e7ec",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {section.title}
              </Typography>
              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: 18,
                  transition: "transform 160ms ease",
                  transform: openSections[section.title] ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </ListItemButton>
            <Collapse in={openSections[section.title]} timeout="auto" unmountOnExit>
              <List sx={{ gap: 0.5, display: "grid", p: 0 }}>
                {section.items.map((item) => {
                  const selected =
                    item.to === "/admin"
                      ? location.pathname === "/admin"
                      : location.pathname.startsWith(item.to);

                  return (
                    <ListItemButton
                      key={item.to}
                      component={NavLink}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      selected={selected}
                    sx={{
                      minHeight: 42,
                      borderRadius: 0,
                      color: "#344054",
                      borderLeft: "3px solid transparent",
                      "&.active, &.Mui-selected": {
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(242,247,255,1) 100%)",
                        color: section.accent.strong,
                        borderLeftColor: section.accent.strong,
                        "& .MuiListItemIcon-root": {
                          color: section.accent.strong,
                        },
                      },
                      "&:hover": {
                        bgcolor: "#fcfcfd",
                      },
                    }}
                  >
                      <ListItemIcon
                        sx={{
                          minWidth: 38,
                          color: selected ? section.accent.strong : section.accent.strong,
                          opacity: selected ? 1 : 0.72,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: selected ? 800 : 700,
                        }}
                      />
                      {item.badge ? (
                        <Chip
                          label={item.badge}
                          size="small"
                          sx={{
                            height: 22,
                            bgcolor: "#ecfdf3",
                            color: "#027a48",
                            borderRadius: 0,
                            fontSize: 11,
                            fontWeight: 800,
                          }}
                        />
                      ) : null}
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: "auto" }}>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleLogoutAll}
            sx={{
              borderRadius: 0,
              borderColor: "#d0d5dd",
              color: "#344054",
              py: 1.2,
              "&:hover": {
                borderColor: "#98a2b3",
                bgcolor: "#f9fafb",
              },
            }}
          >
            End all sessions
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            disabled={logoutStatus === "loading"}
            sx={{
              borderRadius: 0,
              py: 1.2,
              borderColor: "#101828",
              color: "#101828",
              "&:hover": {
                borderColor: "#1d2939",
                bgcolor: "#f9fafb",
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
    <AdminThemeProvider>
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        background: "linear-gradient(180deg, #f9fafb 0%, #f6f7f9 100%)",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: "rgba(255,255,255,0.88)",
          color: "text.primary",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ minHeight: 76, gap: 2.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Paper
            component="form"
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              flex: 1,
              maxWidth: 620,
              height: 44,
              px: 1.5,
              border: "1px solid #e4e7ec",
              borderRadius: 0,
              bgcolor: "#ffffff",
            }}
            onSubmit={(event) => event.preventDefault()}
          >
            <InputBase
              fullWidth
              placeholder="Search users, chats, papers"
              startAdornment={
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: "#667085", fontSize: 20 }} />
                </InputAdornment>
              }
              sx={{ fontSize: 14, color: "#101828" }}
            />
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                ml: 1,
                px: 1,
                py: 0.5,
                border: "1px solid #e4e7ec",
                color: "#667085",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              <KeyboardCommandKeyRoundedIcon sx={{ fontSize: 14 }} />
              <span>K</span>
            </Stack>
          </Paper>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            component={RouterLink}
            to="/admin/account"
            sx={{
              border: "1px solid #e4e7ec",
              borderRadius: 0,
              color: "#475467",
              width: 44,
              height: 44,
            }}
            aria-label="Account"
          >
            <AccountCircleOutlinedIcon />
          </IconButton>

          <IconButton
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              border: "1px solid #e4e7ec",
              borderRadius: 0,
              color: "#475467",
              width: 44,
              height: 44,
            }}
            aria-label="Notifications"
          >
            <Badge variant="dot" color="error">
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>

          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            endIcon={<LaunchRoundedIcon />}
            sx={{
              borderColor: "divider",
              color: "text.primary",
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
    </AdminThemeProvider>
  );
};

export default AdminLayout;
