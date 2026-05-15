import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Chip, Stack, Typography } from "@mui/material";
import AdminSurface from "@/components/shared/AdminSurface";
import { demoMacros } from "@/features/support/data/demoMacros";
import RichTextViewerEditor from "@/features/support/components/notes/RichTextViewerEditor";

const SupportMacroDetailPage = () => {
  const { macroId = "" } = useParams();

  const macro = useMemo(
    () => demoMacros.find((item) => item.id === macroId) || null,
    [macroId]
  );

  if (!macro) {
    return (
      <AdminSurface sx={{ p: 3 }}>
        <Typography sx={{ color: "#667085" }}>Macro not found.</Typography>
      </AdminSurface>
    );
  }

  return (
    <Stack spacing={2}>
      <AdminSurface sx={{ p: 2.5 }}>
        <Typography sx={{ color: "#101828", fontWeight: 800 }}>{macro.title}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip size="small" label={macro.category} sx={{ fontWeight: 800 }} />
          <Chip size="small" label={macro.channel} sx={{ fontWeight: 800 }} />
          <Chip size="small" label={`${macro.usageCount} uses`} sx={{ fontWeight: 800 }} />
        </Stack>
      </AdminSurface>
      <RichTextViewerEditor value={`<p>${macro.body}</p>`} editable={false} minHeight={280} />
    </Stack>
  );
};

export default SupportMacroDetailPage;
