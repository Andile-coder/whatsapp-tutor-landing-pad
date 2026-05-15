import { Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import AdminTableSurface from "@/components/shared/AdminTableSurface";
import { analyticsByChannel } from "@/features/support/data/demoAnalytics";

const SupportReportsChannelsPage = () => (
  <AdminTableSurface minWidth={760}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Channel</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Open</TableCell>
          <TableCell>Resolved rate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {analyticsByChannel.map((row) => (
          <TableRow key={row.channel}>
            <TableCell>{row.channel}</TableCell>
            <TableCell>{row.volume}</TableCell>
            <TableCell>{row.open}</TableCell>
            <TableCell>{row.resolvedRate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </AdminTableSurface>
);

export default SupportReportsChannelsPage;
