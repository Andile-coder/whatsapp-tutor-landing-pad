import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
import { adminUsersApi } from "@/lib/admin-users-api";
import { LearnerUser } from "@/types/admin-users";
import { store } from "@/store";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<LearnerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await runAdminAuthedRequest({
          dispatch,
          getState: store.getState,
          requestFn: (accessToken) => adminUsersApi.listUsers(accessToken),
        });

        if (isMounted) {
          setUsers(response.users || []);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load learner users."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const rows = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        name:
          [user.first_name, user.last_name].filter(Boolean).join(" ") ||
          "Unnamed learner",
        waId: user.wa_id,
        phoneNumber: user.phone,
        email: user.email || "Not set",
        grade: user.grade || "Not set",
        school: user.school_name || "Not set",
        roles: user.roles || [],
        isActive: Boolean(user.is_active),
        acceptedTerms: Boolean(user.accepted_terms),
      })),
    [users]
  );

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.18em", color: "#64748b", fontWeight: 700 }}
        >
          Learners
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}
        >
          WhatsApp users
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 760, color: "#475569" }}>
          This table is loaded from <strong>`GET /v4/admin/users`</strong> and
          shows learner records from the WhatsApp registration system, not the
          logged-in admin account.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography
            component="button"
            onClick={() => navigate("/admin/users/new")}
            sx={{
              border: "none",
              background: "transparent",
              p: 0,
              color: "#1d4ed8",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Create learner
          </Typography>
        </Box>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 6,
          border: "1px solid rgba(148,163,184,0.18)",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 980 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                User
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                WA ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                Grade
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                School
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                Roles
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                Terms
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ py: 8 }}>
                  <Stack spacing={1.5} alignItems="center">
                    <CircularProgress size={28} />
                    <Typography sx={{ color: "#475569" }}>
                      Loading users...
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => navigate(`/admin/users/${encodeURIComponent(row.waId)}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "#0f172a", width: 40, height: 40 }}>
                        {row.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                          {row.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          {row.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: "#334155" }}>{row.waId}</TableCell>
                  <TableCell sx={{ color: "#334155" }}>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ color: "#334155" }}>{row.grade}</TableCell>
                  <TableCell sx={{ color: "#334155" }}>{row.school}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {row.roles.length ? (
                        row.roles.map((role) => (
                          <Chip
                            key={`${row.id}-${role.code}`}
                            label={role.name}
                            size="small"
                            sx={{
                              bgcolor: "#e2e8f0",
                              color: "#0f172a",
                              fontWeight: 600,
                            }}
                          />
                        ))
                      ) : (
                        <Chip
                          label="No roles"
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: "#cbd5e1", color: "#64748b" }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.isActive ? "Active" : "Inactive"}
                      size="small"
                      sx={
                        row.isActive
                          ? {
                              bgcolor: "#dbeafe",
                              color: "#1d4ed8",
                              fontWeight: 700,
                            }
                          : {
                              bgcolor: "#f1f5f9",
                              color: "#475569",
                              fontWeight: 700,
                            }
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.acceptedTerms ? "Accepted" : "Pending"}
                      size="small"
                      variant={row.acceptedTerms ? "filled" : "outlined"}
                      sx={
                        row.acceptedTerms
                          ? {
                              bgcolor: "#dcfce7",
                              color: "#166534",
                              fontWeight: 700,
                            }
                          : {
                              borderColor: "#cbd5e1",
                              color: "#64748b",
                            }
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} sx={{ py: 8 }}>
                  <Stack spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                      No users available
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      The backend returned an empty users list.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default AdminUsers;
