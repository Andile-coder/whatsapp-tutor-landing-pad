import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { analyticsByAgent } from "@/features/support/data/demoAnalytics";

const SupportReportsAgentsPage = () => (
  <Stack spacing={2}>
    <AdminTableSurface minWidth={900}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Agent</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>Resolved today</TableCell>
            <TableCell>Avg response</TableCell>
            <TableCell>CSAT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analyticsByAgent.map((row) => (
            <TableRow key={row.agent}>
              <TableCell>{row.agent}</TableCell>
              <TableCell>{row.open}</TableCell>
              <TableCell>{row.resolvedToday}</TableCell>
              <TableCell>{row.avgFirstResponseMins} min</TableCell>
              <TableCell>{row.csat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminTableSurface>
  </Stack>
);

export default SupportReportsAgentsPage;
