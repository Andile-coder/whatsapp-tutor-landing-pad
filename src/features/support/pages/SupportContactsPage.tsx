import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  InputAdornment,
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
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import AdminSurface from "@/components/shared/AdminSurface";
import { demoContacts } from "@/features/support/data/demoContacts";

const SupportContactsPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return demoContacts;
    }

    return demoContacts.filter((contact) =>
      [contact.name, contact.phone, contact.email, contact.school, contact.city]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Stack spacing={2}>
      <AdminSurface sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search contact by name, phone, email..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#667085", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
      </AdminSurface>

      <AdminTableSurface minWidth={980}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contact</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>School</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>Last seen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((contact) => (
              <TableRow
                key={contact.id}
                hover
                onClick={() => navigate(`/admin/support/contacts/${contact.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Typography sx={{ fontWeight: 800, color: "#101828" }}>
                    {contact.name}
                  </Typography>
                  <Typography sx={{ color: "#667085", fontSize: 12 }}>
                    {contact.email}
                  </Typography>
                </TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>Grade {contact.grade}</TableCell>
                <TableCell>{contact.school}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={contact.status}
                    sx={{
                      bgcolor: contact.status === "active" ? "#ecfdf3" : "#f2f4f7",
                      color: contact.status === "active" ? "#027a48" : "#475467",
                      fontWeight: 800,
                    }}
                  />
                </TableCell>
                <TableCell>{contact.openConversations}</TableCell>
                <TableCell>{contact.lastSeen}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminTableSurface>

      <AdminSurface>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, nextPage) => setPage(nextPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </AdminSurface>
    </Stack>
  );
};

export default SupportContactsPage;
