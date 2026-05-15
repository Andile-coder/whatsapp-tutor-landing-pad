import { PropsWithChildren } from "react";
import { Paper, PaperProps } from "@mui/material";

type AdminSurfaceProps = PropsWithChildren<PaperProps>;

const AdminSurface = ({ children, sx, ...props }: AdminSurfaceProps) => (
  <Paper
    elevation={0}
    sx={{
      border: "1px solid #e4e7ec",
      backgroundColor: "#ffffff",
      borderRadius: 0,
      boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
      ...sx,
    }}
    {...props}
  >
    {children}
  </Paper>
);

export default AdminSurface;
