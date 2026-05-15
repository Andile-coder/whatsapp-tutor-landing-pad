import { createTheme } from "@mui/material/styles";

export const adminTheme = createTheme({
  shape: {
    borderRadius: 0,
  },
  palette: {
    mode: "light",
    background: {
      default: "#f6f7f9",
      paper: "#ffffff",
    },
    primary: {
      main: "#101828",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#465fff",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#4b5563",
    },
    divider: "rgba(17, 24, 39, 0.12)",
    error: {
      main: "#b91c1c",
    },
    warning: {
      main: "#b45309",
    },
    success: {
      main: "#047857",
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "none",
    },
    overline: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f6f7f9",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          fontWeight: 700,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: "#d0d5dd",
          },
          "&:hover fieldset": {
            borderColor: "#98a2b3",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#465fff",
            borderWidth: 1,
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        select: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#667085",
          fontWeight: 600,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#667085",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#3641f5",
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#3641f5",
            opacity: 1,
          },
        },
        track: {
          backgroundColor: "#d0d5dd",
          opacity: 1,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          border: "1px solid #e4e7ec",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 800,
          color: "#475467",
          backgroundColor: "#f9fafb",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          fontSize: 12,
        },
        root: {
          borderColor: "#eef2f6",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});
