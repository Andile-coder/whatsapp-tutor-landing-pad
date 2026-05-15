import { Chip, Grid, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import { useAppSelector } from "@/store/hooks";

const AdminAccount = () => {
  const { adminUser, tokens } = useAppSelector((state) => state.adminAuth);

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <AdminSurface sx={{ p: 3.5, height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#101828", fontWeight: 800, mb: 2 }}>
              Identity
            </Typography>
            <Stack spacing={1.5}>
              <Typography sx={{ color: "#667085" }}>
                Full name:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700 }}>
                  {[adminUser?.first_name, adminUser?.last_name]
                    .filter(Boolean)
                    .join(" ") || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#667085" }}>
                Email:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700 }}>
                  {adminUser?.email || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#667085" }}>
                Phone:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700 }}>
                  {adminUser?.phone_number || "Unknown"}
                </Typography>
              </Typography>
            </Stack>
          </AdminSurface>
        </Grid>

        <Grid item xs={12} lg={6}>
          <AdminSurface sx={{ p: 3.5, height: "100%" }}>
            <Typography variant="h6" sx={{ color: "#101828", fontWeight: 800, mb: 2 }}>
              Session metadata
            </Typography>
            <Stack spacing={1.5}>
              <Typography sx={{ color: "#667085" }}>
                Session ID:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700, fontFamily: "monospace" }}>
                  {tokens?.sessionId || "Unknown"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#667085" }}>
                Last login:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700 }}>
                  {adminUser?.last_login_at || "Not available"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#667085" }}>
                Created at:{" "}
                <Typography component="span" sx={{ color: "#101828", fontWeight: 700 }}>
                  {adminUser?.created_at || "Not available"}
                </Typography>
              </Typography>
            </Stack>
          </AdminSurface>
        </Grid>
      </Grid>

      <AdminSurface sx={{ p: 3.5 }}>
        <Typography variant="h6" sx={{ color: "#101828", fontWeight: 800, mb: 2 }}>
          Assigned roles
        </Typography>
        {adminUser?.roles?.length ? (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {adminUser.roles.map((role) => (
              <Chip
                key={`${role.code}-${role.assigned_at}`}
                label={`${role.name} (${role.code})`}
                sx={{
                  bgcolor: "#f2f4f7",
                  color: "#344054",
                  fontWeight: 800,
                }}
              />
            ))}
          </Stack>
        ) : (
          <Typography sx={{ color: "#667085" }}>
            No roles are assigned yet.
          </Typography>
        )}
      </AdminSurface>
    </Stack>
  );
};

export default AdminAccount;
