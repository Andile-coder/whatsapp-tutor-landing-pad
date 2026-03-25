import {
  Avatar,
  Box,
  Chip,
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
import { useAppSelector } from "@/store/hooks";

const AdminUsers = () => {
  const { adminUser } = useAppSelector((state) => state.adminAuth);

  const rows = adminUser
    ? [
        {
          id: adminUser.id,
          name:
            [adminUser.first_name, adminUser.last_name]
              .filter(Boolean)
              .join(" ") || "Unnamed admin",
          phoneNumber: adminUser.phone_number,
          email: adminUser.email || "Not set",
          roles: adminUser.roles,
          lastLoginAt: adminUser.last_login_at || "Not available",
          status: "Active",
        },
      ]
    : [];

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
          Users
        </Typography>
        <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}>
          Admin users
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 760, color: "#475569" }}>
          This table is ready for a full users dataset. Right now it renders the
          authenticated admin from the current session because the project does
          not yet have a users listing endpoint.
        </Typography>
      </Paper>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 6,
          border: "1px solid rgba(148,163,184,0.18)",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 760 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>User</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>Roles</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#334155" }}>Last login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id} hover>
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
                          {row.id}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ color: "#334155" }}>{row.phoneNumber}</TableCell>
                  <TableCell sx={{ color: "#334155" }}>{row.email}</TableCell>
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
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: "#dbeafe",
                        color: "#1d4ed8",
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "#475569" }}>{row.lastLoginAt}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ py: 8 }}>
                  <Stack spacing={1} alignItems="center">
                    <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                      No users available
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      Connect a users endpoint to populate this table.
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
