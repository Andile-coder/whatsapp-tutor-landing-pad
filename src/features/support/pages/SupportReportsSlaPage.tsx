import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { analyticsSla } from "@/features/support/data/demoAnalytics";

const SupportReportsSlaPage = () => (
  <AdminTableSurface minWidth={640}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First response bucket</TableCell>
          <TableCell>Conversations</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {analyticsSla.map((row) => (
          <TableRow key={row.bucket}>
            <TableCell>{row.bucket}</TableCell>
            <TableCell>{row.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </AdminTableSurface>
);

export default SupportReportsSlaPage;
