import { Box, Stack, Typography } from "@mui/material";
import { SupportMessage } from "@/features/support/types/support";

type MessageBubbleProps = {
  message: SupportMessage;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isOutgoing = message.direction === "outgoing";
  const isInternal = message.direction === "internal";

  return (
    <Stack
      alignItems={isOutgoing ? "flex-end" : "flex-start"}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          maxWidth: "78%",
          border: "1px solid",
          borderColor: isInternal ? "#facc15" : "divider",
          bgcolor: isInternal ? "#fefce8" : isOutgoing ? "#111827" : "#ffffff",
          color: isOutgoing ? "#ffffff" : "text.primary",
          p: 1.5,
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.75 }}>
          {message.senderName} · {message.createdAt}
        </Typography>
        <Typography sx={{ mt: 0.75, whiteSpace: "pre-wrap" }}>
          {message.body}
        </Typography>
        {message.status ? (
          <Typography variant="caption" sx={{ display: "block", mt: 0.75, opacity: 0.7 }}>
            {message.status}
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
};

export default MessageBubble;

