import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { demoMacros } from "@/features/support/data/demoMacros";

const SupportMacrosPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paged = demoMacros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Stack spacing={2}>
      <AdminTableSurface minWidth={900}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Macro</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Channel</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell>Last used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((macro) => (
              <TableRow
                key={macro.id}
                hover
                onClick={() => navigate(`/admin/support/macros/${macro.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <Typography sx={{ color: "#101828", fontWeight: 800 }}>
                    {macro.title}
                  </Typography>
                  <Typography sx={{ color: "#667085", fontSize: 12 }} noWrap>
                    {macro.body}
                  </Typography>
                </TableCell>
                <TableCell>{macro.category}</TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={macro.channel}
                    sx={{ bgcolor: "#f2f4f7", color: "#344054", fontWeight: 800 }}
                  />
                </TableCell>
                <TableCell>{macro.usageCount}</TableCell>
                <TableCell>{macro.lastUsedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminTableSurface>
      <AdminSurface>
        <TablePagination
          component="div"
          count={demoMacros.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, nextPage) => setPage(nextPage)}
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

export default SupportMacrosPage;
