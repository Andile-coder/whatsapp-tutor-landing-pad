import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Chip, Grid, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import { demoContacts } from "@/features/support/data/demoContacts";

const SupportContactDetailPage = () => {
  const { contactId = "" } = useParams();

  const contact = useMemo(
    () => demoContacts.find((item) => item.id === contactId) || null,
    [contactId]
  );

  if (!contact) {
    return (
      <AdminSurface sx={{ p: 3 }}>
        <Typography sx={{ color: "#667085" }}>Contact not found.</Typography>
      </AdminSurface>
    );
  }

  return (
    <Stack spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <AdminSurface sx={{ p: 2.5 }}>
            <Typography sx={{ color: "#98a2b3", fontWeight: 800, fontSize: 12 }}>
              CONTACT
            </Typography>
            <Typography sx={{ mt: 0.75, color: "#101828", fontWeight: 800 }}>
              {contact.name}
            </Typography>
            <Typography sx={{ color: "#667085" }}>{contact.email}</Typography>
            <Typography sx={{ color: "#667085" }}>{contact.phone}</Typography>
          </AdminSurface>
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminSurface sx={{ p: 2.5 }}>
            <Typography sx={{ color: "#98a2b3", fontWeight: 800, fontSize: 12 }}>
              ACADEMIC
            </Typography>
            <Typography sx={{ mt: 0.75, color: "#101828", fontWeight: 800 }}>
              Grade {contact.grade}
            </Typography>
            <Typography sx={{ color: "#667085" }}>{contact.school}</Typography>
            <Typography sx={{ color: "#667085" }}>{contact.city}</Typography>
          </AdminSurface>
        </Grid>
        <Grid item xs={12} md={4}>
          <AdminSurface sx={{ p: 2.5 }}>
            <Typography sx={{ color: "#98a2b3", fontWeight: 800, fontSize: 12 }}>
              SUPPORT
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.75 }}>
              <Chip
                size="small"
                label={contact.status}
                sx={{
                  bgcolor: contact.status === "active" ? "#ecfdf3" : "#f2f4f7",
                  color: contact.status === "active" ? "#027a48" : "#475467",
                  fontWeight: 800,
                }}
              />
              <Chip size="small" label={`${contact.openConversations} open`} sx={{ fontWeight: 800 }} />
            </Stack>
            <Typography sx={{ mt: 1, color: "#667085" }}>Last seen {contact.lastSeen}</Typography>
          </AdminSurface>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default SupportContactDetailPage;
