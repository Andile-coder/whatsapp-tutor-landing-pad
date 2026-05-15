import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AdminEmptyState from "@/components/shared/AdminEmptyState";
import AdminSurface from "@/components/shared/AdminSurface";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import { adminUsersApi } from "@/features/users/api/adminUsersApi";
import { LearnerUser } from "@/features/users/types/adminUsers";
import { store } from "@/store";

const AdminUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState<LearnerUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const rawRows = useMemo(
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

  const rows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return rawRows.filter((row) => {
      const matchesQuery =
        !query ||
        [
          row.name,
          row.waId,
          row.phoneNumber,
          row.email,
          row.school,
          row.grade,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesGrade = gradeFilter === "all" || row.grade === gradeFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? row.isActive : !row.isActive);

      return matchesQuery && matchesGrade && matchesStatus;
    });
  }, [gradeFilter, rawRows, searchTerm, statusFilter]);

  const uniqueGrades = useMemo(
    () =>
      Array.from(new Set(rawRows.map((row) => row.grade).filter(Boolean))).sort(),
    [rawRows]
  );

  const pagedRows = useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rows, rowsPerPage]
  );

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <AdminSurface sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ xs: "stretch", md: "center" }}>
            <TextField
              fullWidth
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(0);
              }}
              placeholder="Search by name, WA ID, phone, school..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "#667085", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              value={gradeFilter}
              onChange={(event) => {
                setGradeFilter(event.target.value);
                setPage(0);
              }}
              sx={{ minWidth: { xs: "100%", md: 160 } }}
            >
              <MenuItem value="all">All grades</MenuItem>
              {uniqueGrades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  Grade {grade}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(0);
              }}
              sx={{ minWidth: { xs: "100%", md: 160 } }}
            >
              <MenuItem value="all">All statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/users/new")}
              sx={{
                minWidth: { xs: "100%", md: 160 },
                height: 40,
                bgcolor: "#101828",
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "#1d2939",
                },
              }}
            >
              Create learner
            </Button>
          </Stack>
        </Stack>
      </AdminSurface>

      <AdminTableSurface minWidth={980}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>WA ID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Terms</TableCell>
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
              pagedRows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => navigate(`/admin/users/${encodeURIComponent(row.waId)}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: "#101828", width: 40, height: 40 }}>
                        {row.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontWeight: 800, color: "#101828" }}>
                          {row.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          {row.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.waId}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell>{row.school}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {row.roles.length ? (
                        row.roles.map((role) => (
                          <Chip
                            key={`${row.id}-${role.code}`}
                            label={role.name}
                            size="small"
                            sx={{
                              bgcolor: "#f2f7ff",
                              color: "#3641f5",
                              fontWeight: 800,
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
                              bgcolor: "#ecf3ff",
                              color: "#3641f5",
                              fontWeight: 800,
                            }
                          : {
                              bgcolor: "#f2f4f7",
                              color: "#475569",
                              fontWeight: 800,
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
                              bgcolor: "#ecfdf3",
                              color: "#027a48",
                              fontWeight: 800,
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
                <TableCell colSpan={8}>
                  <AdminEmptyState
                    title="No users available"
                    message="The backend returned an empty users list."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AdminTableSurface>
      <AdminSurface>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </AdminSurface>
    </Stack>
  );
};

export default AdminUsers;
