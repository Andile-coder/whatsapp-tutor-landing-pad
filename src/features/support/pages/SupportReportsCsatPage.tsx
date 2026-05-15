import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { analyticsCsat } from "@/features/support/data/demoAnalytics";

const SupportReportsCsatPage = () => (
  <AdminTableSurface minWidth={640}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Rating</TableCell>
          <TableCell>Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {analyticsCsat.map((row) => (
          <TableRow key={row.rating}>
            <TableCell>{row.rating}</TableCell>
            <TableCell>{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </AdminTableSurface>
);

export default SupportReportsCsatPage;
