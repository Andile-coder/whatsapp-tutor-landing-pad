import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

type AdminSectionHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
};

const AdminSectionHeader = ({
  title,
  subtitle,
  action,
}: AdminSectionHeaderProps) => (
  <Stack
    direction={{ xs: "column", sm: "row" }}
    spacing={2}
    alignItems={{ xs: "flex-start", sm: "center" }}
    justifyContent="space-between"
    sx={{ px: 3, py: 2.5, borderBottom: "1px solid #e4e7ec" }}
  >
    <Stack spacing={0.5}>
      <Typography variant="h6" sx={{ color: "#101828", fontWeight: 800 }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ color: "#667085" }}>{subtitle}</Typography>
      ) : null}
    </Stack>
    {action}
  </Stack>
);

export default AdminSectionHeader;
