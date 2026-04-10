import { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";

type PdfFileDropzoneProps = {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  title?: string;
  description?: string;
};

const PdfFileDropzone = ({
  file,
  onFileSelect,
  title = "Drop PDF here",
  description = "or click to browse from your computer",
}: PdfFileDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  return (
    <>
      <Box
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragActive(false);
          onFileSelect(event.dataTransfer.files?.[0] || null);
        }}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          border: dragActive
            ? "2px solid #0f172a"
            : "2px dashed rgba(148,163,184,0.45)",
          borderRadius: 0,
          bgcolor: dragActive ? "#f8fafc" : "#fbfdff",
          p: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 160ms ease",
        }}
      >
        <CloudUploadRoundedIcon
          sx={{ fontSize: 40, color: "#334155", mb: 1.5 }}
        />
        <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#64748b" }}>
          {description}
        </Typography>
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept="application/pdf"
          onChange={(event) => onFileSelect(event.target.files?.[0] || null)}
        />
      </Box>

      {file && (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: 0,
            bgcolor: "#f8fafc",
            border: "1px solid rgba(148,163,184,0.18)",
          }}
        >
          <InsertDriveFileRoundedIcon sx={{ color: "#334155" }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, color: "#0f172a" }} noWrap>
              {file.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default PdfFileDropzone;
