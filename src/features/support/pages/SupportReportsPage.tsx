import { Link as RouterLink } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";

const reportLinks = [
  { title: "Overview", path: "/admin/support/reports/overview", description: "High-level support KPIs and queue health." },
  { title: "Agents", path: "/admin/support/reports/agents", description: "Agent performance and response metrics." },
  { title: "Channels", path: "/admin/support/reports/channels", description: "Volume and resolution by channel." },
  { title: "SLA", path: "/admin/support/reports/sla", description: "First response service-level distribution." },
  { title: "CSAT", path: "/admin/support/reports/csat", description: "Satisfaction trends and rating mix." },
  { title: "Volume", path: "/admin/support/reports/volume", description: "Conversation volume trend view." },
];

const SupportReportsPage = () => (
  <Grid container spacing={2}>
    {reportLinks.map((item) => (
      <Grid item xs={12} md={6} lg={4} key={item.path}>
        <AdminSurface
          component={RouterLink}
          to={item.path}
          sx={{
            display: "block",
            p: 2.5,
            textDecoration: "none",
            "&:hover": {
              bgcolor: "#fcfcfd",
            },
          }}
        >
          <Stack spacing={1}>
            <Typography sx={{ color: "#101828", fontWeight: 800 }}>{item.title}</Typography>
            <Typography sx={{ color: "#667085" }}>{item.description}</Typography>
          </Stack>
        </AdminSurface>
      </Grid>
    ))}
  </Grid>
);

export default SupportReportsPage;
