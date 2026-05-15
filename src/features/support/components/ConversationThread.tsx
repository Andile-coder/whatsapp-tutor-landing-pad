import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import AdminSectionHeader from "@/components/shared/AdminSectionHeader";
import AdminSurface from "@/components/shared/AdminSurface";
import MessageBubble from "@/features/support/components/MessageBubble";
import {
  SupportChannel,
  SupportConversation,
  SupportMessage,
} from "@/features/support/types/support";

type ConversationThreadProps = {
  conversation: SupportConversation;
  messages: SupportMessage[];
};

const channelLabel: Record<SupportChannel, string> = {
  whatsapp: "WhatsApp",
  live_chat: "Live chat",
  email: "Email",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
};

const ConversationThread = ({
  conversation,
  messages,
}: ConversationThreadProps) => (
  <AdminSurface
    sx={{
      height: { xs: "auto", lg: "calc(100vh - 156px)" },
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      overflow: "hidden",
    }}
  >
    <AdminSectionHeader
      title={conversation.learnerName}
      subtitle={`${channelLabel[conversation.channel]} · ${conversation.phoneNumber}`}
      action={
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {conversation.labels.map((label) => (
            <Chip key={label} size="small" label={label} />
          ))}
        </Stack>
      }
    />
    <Stack
      spacing={2}
      sx={{
        p: 2.5,
        overflowY: "auto",
        bgcolor: "#f9fafb",
        backgroundImage:
          "linear-gradient(rgba(70,95,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(70,95,255,0.04) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </Stack>

    <Box sx={{ p: 2.5, borderTop: "1px solid #e4e7ec", bgcolor: "#ffffff" }}>
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" size="small">
            Reply
          </Button>
          <Button variant="outlined" size="small">
            Internal note
          </Button>
        </Stack>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Write a reply to the learner"
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Draft composer. Backend send endpoint will plug in here.
          </Typography>
          <Button variant="contained">Send</Button>
        </Stack>
      </Stack>
    </Box>
  </AdminSurface>
);

export default ConversationThread;
