import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AdminPageHeader from "@/components/shared/AdminPageHeader";
import AdminStatCard from "@/components/shared/AdminStatCard";
import AdminSurface from "@/components/shared/AdminSurface";
import { UserStatsCounts, adminUsersApi } from "@/features/users/api/adminUsersApi";
import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const EMPTY_COUNTS: UserStatsCounts = {
  total_users: 0,
  active_users: 0,
  inactive_users: 0,
  recently_active_users_7d: 0,
};

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    adminUser,
    tokens,
    error: authError,
  } = useAppSelector((state) => state.adminAuth);
  const [counts, setCounts] = useState<UserStatsCounts>(EMPTY_COUNTS);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        setStatsError(null);

        const response = await runAdminAuthedRequest({
          dispatch,
          getState: store.getState,
          requestFn: (accessToken) => adminUsersApi.getUserStats(accessToken),
        });

        if (isMounted) {
          setCounts(response.counts || EMPTY_COUNTS);
        }
      } catch (loadError) {
        if (isMounted) {
          setStatsError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load user statistics."
          );
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const statCards = useMemo(
    () => [
      {
        label: "Total users",
        value: counts.total_users,
        helper: "All learner records",
      },
      {
        label: "Active users",
        value: counts.active_users,
        helper: "Users with is_active = true",
      },
      {
        label: "Inactive users",
        value: counts.inactive_users,
        helper: "Users with is_active = false",
      },
      {
        label: "Recently active",
        value: counts.recently_active_users_7d,
        helper: "Seen in the last 7 days",
      },
    ],
    [counts]
  );

  return (
    <Stack spacing={3}>
      {(authError || statsError) && (
        <Alert severity="error">{authError || statsError}</Alert>
      )}

      <AdminPageHeader
        eyebrow="Overview"
        title="Admin dashboard"
        description="High-level learner activity and admin session details live here so the team can see platform health quickly before drilling into users, documents, or paper uploads."
      />

      <Grid container spacing={2}>
        {statCards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <AdminStatCard
              label={card.label}
              value={card.value}
              helper={card.helper}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AdminSurface sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#101828", mb: 2.5 }}
            >
              Admin profile
            </Typography>
            <Stack spacing={1.5}>
              <Typography sx={{ color: "#475569" }}>
                Name:{" "}
                <Typography component="span" sx={{ fontWeight: 800, color: "#101828" }}>
                  {[adminUser?.first_name, adminUser?.last_name]
                    .filter(Boolean)
                    .join(" ") || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Phone:{" "}
                <Typography component="span" sx={{ fontWeight: 800, color: "#101828" }}>
                  {adminUser?.phone_number || "Unknown"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Email:{" "}
                <Typography component="span" sx={{ fontWeight: 800, color: "#101828" }}>
                  {adminUser?.email || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Session ID:{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: 800, color: "#101828", fontFamily: "monospace" }}
                >
                  {tokens?.sessionId || "Unknown"}
                </Typography>
              </Typography>
            </Stack>
          </AdminSurface>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <AdminSurface sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: "#101828", mb: 2.5 }}
            >
              Assigned roles
            </Typography>
            {adminUser?.roles?.length ? (
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {adminUser.roles.map((role) => (
                  <Chip
                    key={`${role.code}-${role.assigned_at}`}
                    label={`${role.name} (${role.code})`}
                    sx={{
                      borderRadius: 0,
                      bgcolor: "#e2e8f0",
                      color: "#101828",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
            ) : (
              <Typography sx={{ color: "#64748b" }}>
                No roles are assigned yet.
              </Typography>
            )}
          </AdminSurface>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AdminDashboard;
