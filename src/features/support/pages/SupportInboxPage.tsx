import { useMemo, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import ConversationList from "@/features/support/components/ConversationList";
import ConversationThread from "@/features/support/components/ConversationThread";
import LearnerContextPanel from "@/features/support/components/LearnerContextPanel";
import SupportFilters from "@/features/support/components/SupportFilters";
import {
  supportConversations,
  supportLearnerContexts,
  supportMessages,
} from "@/features/support/data/mockSupportData";
import {
  ConversationStatus,
  SupportChannel,
} from "@/features/support/types/support";
import { channelOptions, statusOptions } from "@/features/support/components/SupportFilters";

const SupportInboxPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState(
    supportConversations[0]?.id || ""
  );
  const [selectedStatuses, setSelectedStatuses] = useState<ConversationStatus[]>(
    statusOptions.map((option) => option.value)
  );
  const [selectedChannels, setSelectedChannels] = useState<SupportChannel[]>(
    channelOptions
      .filter((option) => ["whatsapp", "live_chat", "email"].includes(option.value))
      .map((option) => option.value)
  );
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return supportConversations.filter((conversation) => {
      const matchesStatus =
        !selectedStatuses.length ||
        selectedStatuses.includes(conversation.status);

      const matchesChannel =
        !selectedChannels.length ||
        selectedChannels.includes(conversation.channel);

      const matchesSearch =
        !normalizedSearch ||
        [
          conversation.learnerName,
          conversation.phoneNumber,
          conversation.waId,
          conversation.lastMessagePreview,
          conversation.schoolName,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesStatus && matchesChannel && matchesSearch;
    });
  }, [search, selectedChannels, selectedStatuses]);

  const selectedConversation =
    filteredConversations.find(
      (conversation) => conversation.id === selectedConversationId
    ) ||
    filteredConversations[0] ||
    supportConversations[0];

  const selectedMessages = selectedConversation
    ? supportMessages[selectedConversation.id] || []
    : [];
  const selectedContext = selectedConversation
    ? supportLearnerContexts[selectedConversation.id]
    : null;

  return (
    <Stack spacing={1.25}>
      <AdminSurface sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#fcfcfd",
            backgroundImage:
              "linear-gradient(rgba(70,95,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(70,95,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          <SupportFilters
            selectedStatuses={selectedStatuses}
            onStatusesChange={setSelectedStatuses}
            selectedChannels={selectedChannels}
            onChannelsChange={setSelectedChannels}
            search={search}
            onSearchChange={setSearch}
          />
        </Box>
      </AdminSurface>

      {selectedConversation && selectedContext ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <ConversationList
              conversations={filteredConversations}
              selectedConversationId={selectedConversation.id}
              onSelectConversation={setSelectedConversationId}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ConversationThread
              conversation={selectedConversation}
              messages={selectedMessages}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <LearnerContextPanel
              conversation={selectedConversation}
              context={selectedContext}
            />
          </Grid>
        </Grid>
      ) : (
        <AdminSurface sx={{ p: 5, textAlign: "center" }}>
          <Box>
            <Typography variant="h6">No conversations found</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Adjust the filters or search term to view support conversations.
            </Typography>
          </Box>
        </AdminSurface>
      )}
    </Stack>
  );
};

export default SupportInboxPage;
