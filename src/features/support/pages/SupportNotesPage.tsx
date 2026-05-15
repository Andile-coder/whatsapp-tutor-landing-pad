import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AdminSurface from "@/components/shared/AdminSurface";
import RichTextViewerEditor from "@/features/support/components/notes/RichTextViewerEditor";

type NoteType = "note" | "email";

type SupportNote = {
  id: string;
  title: string;
  type: NoteType;
  body: string;
  to?: string;
  cc?: string;
  subject?: string;
  updatedAt: string;
};

const initialNotes: SupportNote[] = [
  {
    id: "n1",
    title: "Onboarding follow-up",
    type: "note",
    body: "<p>Learner requested weekend follow-up for timetable setup.</p>",
    updatedAt: "2026-05-15 09:12",
  },
  {
    id: "n2",
    title: "Missing paper escalation",
    type: "email",
    to: "support@school.edu",
    cc: "ops@mosa.ai",
    subject: "Missing Grade 12 paper",
    body: "<p>Hello team,<br/>Please assist with the missing paper upload.</p>",
    updatedAt: "2026-05-15 10:03",
  },
];

const SupportNotesPage = () => {
  const [notes, setNotes] = useState<SupportNote[]>(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(initialNotes[0]?.id || "");
  const [mode, setMode] = useState<"edit" | "view">("edit");

  const selectedNote = useMemo(
    () => notes.find((note) => note.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const handleNewNote = () => {
    const nextNote: SupportNote = {
      id: crypto.randomUUID(),
      title: "Untitled note",
      type: "note",
      body: "",
      updatedAt: new Date().toISOString(),
    };

    setNotes((current) => [nextNote, ...current]);
    setSelectedNoteId(nextNote.id);
    setMode("edit");
  };

  const updateSelectedNote = (patch: Partial<SupportNote>) => {
    if (!selectedNote) {
      return;
    }

    setNotes((current) =>
      current.map((note) =>
        note.id === selectedNote.id
          ? {
              ...note,
              ...patch,
              updatedAt: new Date().toISOString(),
            }
          : note
      )
    );
  };

  return (
    <Grid container spacing={2.5} sx={{ minHeight: "calc(100vh - 170px)" }}>
      <Grid item xs={12} lg={3.5}>
        <AdminSurface sx={{ p: 2.5, height: "100%" }}>
          <Stack spacing={2}>
            <Button variant="contained" onClick={handleNewNote} sx={{ bgcolor: "#101828", "&:hover": { bgcolor: "#1d2939" } }}>
              New note
            </Button>
            <Stack spacing={1}>
              {notes.map((note) => (
                <Box
                  key={note.id}
                  component="button"
                  onClick={() => {
                    setSelectedNoteId(note.id);
                    setMode("edit");
                  }}
                  sx={{
                    textAlign: "left",
                    border: "1px solid #e4e7ec",
                    bgcolor: note.id === selectedNoteId ? "#f2f4f7" : "#ffffff",
                    p: 1.5,
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {note.type === "email" ? (
                      <EmailOutlinedIcon sx={{ fontSize: 16, color: "#026aa2" }} />
                    ) : (
                      <NoteAltOutlinedIcon sx={{ fontSize: 16, color: "#475467" }} />
                    )}
                    <Typography sx={{ fontWeight: 700, color: "#101828" }} noWrap>
                      {note.title}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 12 }}>
                    {note.updatedAt}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </AdminSurface>
      </Grid>

      <Grid item xs={12} lg={8.5}>
        <AdminSurface sx={{ p: 2.5, height: "100%" }}>
          {selectedNote ? (
            <Stack spacing={2} sx={{ height: "100%" }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                  fullWidth
                  label="Title"
                  value={selectedNote.title}
                  onChange={(event) => updateSelectedNote({ title: event.target.value })}
                />
                <TextField
                  select
                  label="Type"
                  value={selectedNote.type}
                  onChange={(event) =>
                    updateSelectedNote({ type: event.target.value as NoteType })
                  }
                  sx={{ minWidth: { xs: "100%", md: 180 } }}
                >
                  <MenuItem value="note">Internal note</MenuItem>
                  <MenuItem value="email">Email draft</MenuItem>
                </TextField>
                <Button
                  variant="outlined"
                  onClick={() => setMode((current) => (current === "edit" ? "view" : "edit"))}
                  sx={{ minWidth: { xs: "100%", md: 120 } }}
                >
                  {mode === "edit" ? "Preview" : "Edit"}
                </Button>
              </Stack>

              {selectedNote.type === "email" ? (
                <Stack spacing={1.5}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                    <TextField
                      fullWidth
                      label="To"
                      placeholder="name@domain.com"
                      value={selectedNote.to || ""}
                      onChange={(event) => updateSelectedNote({ to: event.target.value })}
                    />
                    <TextField
                      fullWidth
                      label="CC"
                      placeholder="name@domain.com"
                      value={selectedNote.cc || ""}
                      onChange={(event) => updateSelectedNote({ cc: event.target.value })}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={selectedNote.subject || ""}
                    onChange={(event) => updateSelectedNote({ subject: event.target.value })}
                  />
                </Stack>
              ) : null}

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={selectedNote.type === "email" ? "Email draft" : "Internal note"}
                  sx={{
                    bgcolor: selectedNote.type === "email" ? "#e0f2fe" : "#f2f4f7",
                    color: selectedNote.type === "email" ? "#026aa2" : "#344054",
                    fontWeight: 800,
                  }}
                />
                <Typography sx={{ color: "#667085", fontSize: 12 }}>
                  Updated {selectedNote.updatedAt}
                </Typography>
              </Stack>

              <Box sx={{ flex: 1, minHeight: 0 }}>
                <RichTextViewerEditor
                  value={selectedNote.body}
                  onChange={(nextBody) => updateSelectedNote({ body: nextBody })}
                  editable={mode === "edit"}
                  placeholder="Write a note or an email draft..."
                  minHeight={500}
                />
              </Box>
            </Stack>
          ) : (
            <Typography sx={{ color: "#667085" }}>Select a note to get started.</Typography>
          )}
        </AdminSurface>
      </Grid>
    </Grid>
  );
};

export default SupportNotesPage;
