import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  action,
}: AdminPageHeaderProps) => (
  <AdminSurface
    sx={{
      p: { xs: 3, md: 4 },
      background:
        "linear-gradient(135deg, #ffffff 0%, #f9fafb 58%, #f2f7ff 100%)",
    }}
  >
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      justifyContent="space-between"
      spacing={2}
    >
      <Stack spacing={1.25} sx={{ maxWidth: 860 }}>
        <Typography
          variant="overline"
          sx={{ color: "#667085", letterSpacing: "0.16em", fontWeight: 800 }}
        >
          {eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ color: "#101828", fontWeight: 800 }}>
          {title}
        </Typography>
        {description ? (
          <Typography sx={{ color: "#667085", maxWidth: 760 }}>
            {description}
          </Typography>
        ) : null}
      </Stack>
      {action}
    </Stack>
  </AdminSurface>
);

export default AdminPageHeader;
