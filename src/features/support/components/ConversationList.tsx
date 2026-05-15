import { Box, Chip, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import {
  SupportChannel,
  SupportConversation,
} from "@/features/support/types/support";

type ConversationListProps = {
  conversations: SupportConversation[];
  selectedConversationId: string;
  onSelectConversation: (conversationId: string) => void;
};

const statusColor = {
  open: "#3641f5",
  pending: "#b45309",
  resolved: "#027a48",
};

const channelLabel: Record<SupportChannel, string> = {
  whatsapp: "WhatsApp",
  live_chat: "Live chat",
  email: "Email",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
};

const channelColor: Record<SupportChannel, string> = {
  whatsapp: "#047857",
  live_chat: "#2563eb",
  email: "#7c2d12",
  facebook: "#1d4ed8",
  instagram: "#be185d",
  twitter: "#0369a1",
};

const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) => (
  <AdminSurface
    sx={{
      overflow: "hidden",
      height: { xs: "auto", lg: "calc(100vh - 156px)" },
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Stack sx={{ overflowY: "auto" }}>
      {conversations.map((conversation) => {
        const isSelected = conversation.id === selectedConversationId;

        return (
          <Box
            component="button"
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            sx={{
              width: "100%",
              border: 0,
              borderBottom: "1px solid #eef2f6",
              borderLeft: "3px solid",
              borderLeftColor: isSelected ? "#465fff" : "transparent",
              bgcolor: isSelected ? "#f2f7ff" : "transparent",
              color: "inherit",
              cursor: "pointer",
              p: 2,
              textAlign: "left",
              "&:hover": {
                bgcolor: isSelected ? "#f2f7ff" : "#fcfcfd",
              },
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Typography sx={{ fontWeight: 800, color: "#101828" }} noWrap>
                  {conversation.learnerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {conversation.lastActivityAt}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" noWrap>
                {conversation.lastMessagePreview}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
                <Chip
                  size="small"
                  label={channelLabel[conversation.channel]}
                  sx={{
                    bgcolor: `${channelColor[conversation.channel]}14`,
                    color: channelColor[conversation.channel],
                    fontWeight: 800,
                  }}
                />
                <Chip
                  size="small"
                  label={conversation.status}
                  sx={{
                    bgcolor: `${statusColor[conversation.status]}14`,
                    color: statusColor[conversation.status],
                    fontWeight: 800,
                  }}
                />
                <Chip size="small" label={`Grade ${conversation.grade}`} />
                {conversation.unreadCount > 0 ? (
                  <Chip size="small" label={conversation.unreadCount} color="secondary" />
                ) : null}
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  </AdminSurface>
);

export default ConversationList;
