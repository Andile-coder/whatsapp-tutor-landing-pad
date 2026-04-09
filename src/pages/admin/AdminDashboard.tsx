import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { UserStatsCounts, adminUsersApi } from "@/lib/admin-users-api";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
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

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 0,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.18em", color: "#64748b", fontWeight: 700 }}
        >
          Overview
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}
        >
          Admin dashboard
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 780, color: "#475569" }}>
          High-level learner activity and admin session details live here so
          the team can see platform health quickly before drilling into users,
          documents, or paper uploads.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {statCards.map((card) => (
          <Grid key={card.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 0,
                border: "1px solid rgba(148,163,184,0.18)",
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.12em",
                  color: "#64748b",
                  fontWeight: 700,
                }}
              >
                {card.label}
              </Typography>
              <Typography
                variant="h4"
                sx={{ mt: 1, fontWeight: 700, color: "#0f172a" }}
              >
                {card.value.toLocaleString()}
              </Typography>
              <Typography sx={{ mt: 1, color: "#64748b" }}>
                {card.helper}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 0,
              border: "1px solid rgba(148,163,184,0.18)",
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#0f172a", mb: 2.5 }}
            >
              Admin profile
            </Typography>
            <Stack spacing={1.5}>
              <Typography sx={{ color: "#475569" }}>
                Name:{" "}
                <Typography component="span" sx={{ fontWeight: 600, color: "#0f172a" }}>
                  {[adminUser?.first_name, adminUser?.last_name]
                    .filter(Boolean)
                    .join(" ") || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Phone:{" "}
                <Typography component="span" sx={{ fontWeight: 600, color: "#0f172a" }}>
                  {adminUser?.phone_number || "Unknown"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Email:{" "}
                <Typography component="span" sx={{ fontWeight: 600, color: "#0f172a" }}>
                  {adminUser?.email || "Not set"}
                </Typography>
              </Typography>
              <Typography sx={{ color: "#475569" }}>
                Session ID:{" "}
                <Typography
                  component="span"
                  sx={{ fontWeight: 600, color: "#0f172a", fontFamily: "monospace" }}
                >
                  {tokens?.sessionId || "Unknown"}
                </Typography>
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 0,
              border: "1px solid rgba(148,163,184,0.18)",
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#0f172a", mb: 2.5 }}
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
                      color: "#0f172a",
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
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AdminDashboard;
