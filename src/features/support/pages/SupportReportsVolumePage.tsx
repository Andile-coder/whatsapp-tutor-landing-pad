import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { analyticsVolumeTrend } from "@/features/support/data/demoAnalytics";

const SupportReportsVolumePage = () => (
  <AdminTableSurface minWidth={720}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Day</TableCell>
          <TableCell>Incoming volume</TableCell>
          <TableCell>Resolved</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {analyticsVolumeTrend.map((row) => (
          <TableRow key={row.day}>
            <TableCell>{row.day}</TableCell>
            <TableCell>{row.volume}</TableCell>
            <TableCell>{row.resolved}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </AdminTableSurface>
);

export default SupportReportsVolumePage;
