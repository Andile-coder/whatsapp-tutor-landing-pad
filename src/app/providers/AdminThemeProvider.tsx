import { PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { adminTheme } from "@/app/theme/adminTheme";

const AdminThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={adminTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default AdminThemeProvider;
