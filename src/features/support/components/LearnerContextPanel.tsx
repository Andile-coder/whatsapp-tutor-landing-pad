import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import AdminSectionHeader from "@/components/shared/AdminSectionHeader";
import AdminSurface from "@/components/shared/AdminSurface";
import {
  SupportConversation,
  SupportLearnerContext,
} from "@/features/support/types/support";

type LearnerContextPanelProps = {
  conversation: SupportConversation;
  context: SupportLearnerContext;
};

const LearnerContextPanel = ({
  conversation,
  context,
}: LearnerContextPanelProps) => (
  <AdminSurface
    sx={{
      height: { xs: "auto", lg: "calc(100vh - 156px)" },
      overflowY: "auto",
    }}
  >
    <AdminSectionHeader
      title={`${context.firstName} ${context.lastName}`}
      subtitle={context.waId}
    />
    <Stack spacing={2.5} sx={{ p: 2.5 }}>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        <Chip label={`Grade ${context.grade}`} sx={{ fontWeight: 800 }} />
        <Chip label={conversation.status} sx={{ fontWeight: 800 }} />
        <Chip label={conversation.assignee?.name || "Unassigned"} sx={{ fontWeight: 800 }} />
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 800, color: "#101828" }}>Profile</Typography>
        <Typography color="text.secondary">School: {context.schoolName}</Typography>
        <Typography color="text.secondary">Province: {context.province}</Typography>
        <Typography color="text.secondary">City: {context.city}</Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography sx={{ fontWeight: 800, color: "#101828" }}>Consent</Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            label={context.acceptedTerms ? "Terms accepted" : "Terms pending"}
            color={context.acceptedTerms ? "success" : "default"}
          />
          <Chip
            label={
              context.acceptedPrivacyPolicy ? "Privacy accepted" : "Privacy pending"
            }
            color={context.acceptedPrivacyPolicy ? "success" : "default"}
          />
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={1.25}>
        <Typography sx={{ fontWeight: 800, color: "#101828" }}>Recent requests</Typography>
        {context.recentRequests.map((request) => (
          <Box key={`${request.queryText}-${request.lastRequest}`}>
            <Typography sx={{ fontWeight: 700, color: "#101828" }}>
              {request.queryText}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {request.requestCount} requests · {request.lastRequest}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack spacing={1.25}>
        <Typography sx={{ fontWeight: 800, color: "#101828" }}>Recent downloads</Typography>
        {context.recentDownloads.length ? (
          context.recentDownloads.map((download) => (
            <Box key={`${download.documentName}-${download.lastDownload}`}>
              <Typography sx={{ fontWeight: 700, color: "#101828" }}>
                {download.documentName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {download.lastDownload}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No recent downloads.</Typography>
        )}
      </Stack>
    </Stack>
  </AdminSurface>
);

export default LearnerContextPanel;
