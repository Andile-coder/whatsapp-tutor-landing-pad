import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";

type AdminStatCardProps = {
  label: string;
  value: number | string;
  helper?: string;
  icon?: ReactNode;
};

const AdminStatCard = ({ label, value, helper, icon }: AdminStatCardProps) => (
  <AdminSurface sx={{ p: 3, height: "100%" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Stack spacing={1}>
        <Typography
          variant="overline"
          sx={{ color: "#667085", fontWeight: 800, letterSpacing: "0.13em" }}
        >
          {label}
        </Typography>
        <Typography variant="h4" sx={{ color: "#101828", fontWeight: 800 }}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>
        {helper ? (
          <Typography sx={{ color: "#667085" }}>{helper}</Typography>
        ) : null}
      </Stack>
      {icon ? (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            bgcolor: "#f2f7ff",
            color: "#465fff",
            border: "1px solid #dde9ff",
          }}
        >
          {icon}
        </Box>
      ) : null}
    </Stack>
  </AdminSurface>
);

export default AdminStatCard;
