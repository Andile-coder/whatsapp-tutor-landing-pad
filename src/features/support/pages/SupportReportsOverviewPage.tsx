import { Grid, Typography } from "@mui/material";
import AdminStatCard from "@/components/shared/AdminStatCard";
import { analyticsOverview } from "@/features/support/data/demoAnalytics";

const SupportReportsOverviewPage = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6} lg={4}>
      <AdminStatCard label="Total conversations" value={analyticsOverview.totalConversations} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <AdminStatCard label="Open conversations" value={analyticsOverview.openConversations} />
    </Grid>
    <Grid item xs={12} md={6} lg={4}>
      <AdminStatCard label="Resolved today" value={analyticsOverview.resolvedToday} />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <AdminStatCard label="Avg first response (mins)" value={analyticsOverview.avgFirstResponseMins} />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <AdminStatCard label="CSAT score" value={analyticsOverview.csatScore} />
    </Grid>
  </Grid>
);

export default SupportReportsOverviewPage;
