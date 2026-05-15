import { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

type AdminEmptyStateProps = {
  title: string;
  message?: ReactNode;
  icon?: ReactNode;
};

const AdminEmptyState = ({ title, message, icon }: AdminEmptyStateProps) => (
  <Stack spacing={1.25} alignItems="center" sx={{ py: 8, px: 3, textAlign: "center" }}>
    {icon ? (
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 48,
          height: 48,
          bgcolor: "#f2f4f7",
          color: "#667085",
        }}
      >
        {icon}
      </Box>
    ) : null}
    <Typography sx={{ fontWeight: 800, color: "#101828" }}>{title}</Typography>
    {message ? (
      <Typography variant="body2" sx={{ maxWidth: 420, color: "#667085" }}>
        {message}
      </Typography>
    ) : null}
  </Stack>
);

export default AdminEmptyState;
