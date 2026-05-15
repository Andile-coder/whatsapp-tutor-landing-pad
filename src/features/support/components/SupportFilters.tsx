import { Stack, TextField } from "@mui/material";
import CheckboxDropdown, {
  CheckboxDropdownOption,
} from "@/components/shared/CheckboxDropdown";
import {
  ConversationStatus,
  SupportChannel,
} from "@/features/support/types/support";

type SupportFiltersProps = {
  selectedStatuses: ConversationStatus[];
  onStatusesChange: (statuses: ConversationStatus[]) => void;
  selectedChannels: SupportChannel[];
  onChannelsChange: (channels: SupportChannel[]) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export const statusOptions: Array<CheckboxDropdownOption<ConversationStatus>> = [
  { label: "Open", value: "open" },
  { label: "Pending", value: "pending" },
  { label: "Resolved", value: "resolved" },
];

export const channelOptions: Array<CheckboxDropdownOption<SupportChannel>> = [
  {
    label: "WhatsApp",
    value: "whatsapp",
    helper: "Learner conversations from WhatsApp",
  },
  {
    label: "Live chat",
    value: "live_chat",
    helper: "Website chat widget conversations",
  },
  {
    label: "Email",
    value: "email",
    helper: "Support email threads",
  },
  {
    label: "Facebook",
    value: "facebook",
    helper: "Planned integration",
  },
  {
    label: "Instagram",
    value: "instagram",
    helper: "Planned integration",
  },
  {
    label: "Twitter",
    value: "twitter",
    helper: "Planned integration",
  },
];

const SupportFilters = ({
  selectedStatuses,
  onStatusesChange,
  selectedChannels,
  onChannelsChange,
  search,
  onSearchChange,
}: SupportFiltersProps) => (
  <Stack
    direction={{ xs: "column", lg: "row" }}
    spacing={1.5}
    alignItems={{ xs: "stretch", lg: "center" }}
  >
    <TextField
      fullWidth
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search learner, channel, school, or message"
      inputProps={{ "aria-label": "Search conversations" }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 42,
        },
      }}
    />
    <CheckboxDropdown
      label="Status"
      options={statusOptions}
      selectedValues={selectedStatuses}
      onChange={onStatusesChange}
      emptyLabel="Any"
    />
    <CheckboxDropdown
      label="Channel"
      options={channelOptions}
      selectedValues={selectedChannels}
      onChange={onChannelsChange}
      emptyLabel="Any"
    />
  </Stack>
);

export default SupportFilters;
