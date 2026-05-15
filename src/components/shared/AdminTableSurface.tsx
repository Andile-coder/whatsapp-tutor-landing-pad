import { PropsWithChildren } from "react";
import { TableContainer } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";

type AdminTableSurfaceProps = PropsWithChildren<{
  minWidth?: number;
}>;

const AdminTableSurface = ({
  children,
  minWidth = 900,
}: AdminTableSurfaceProps) => (
  <TableContainer
    component={AdminSurface}
    sx={{
      overflow: "auto",
      "& table": {
        minWidth,
      },
      "& thead tr": {
        bgcolor: "#f9fafb",
      },
      "& th": {
        color: "#475467",
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        borderBottom: "1px solid #e4e7ec",
        py: 1.5,
      },
      "& td": {
        color: "#344054",
        borderBottom: "1px solid #eef2f6",
        py: 2,
      },
      "& tbody tr:hover": {
        bgcolor: "#fcfcfd",
      },
    }}
  >
    {children}
  </TableContainer>
);

export default AdminTableSurface;
