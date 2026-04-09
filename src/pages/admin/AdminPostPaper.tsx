import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PDFDocument } from "pdf-lib";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
import {
  adminDocumentsApi,
  UpsertDocumentRequest,
} from "@/lib/admin-documents-api";
import { store } from "@/store";

type FormState = {
  document_type: string;
  description: string;
  year: string;
  grade: string;
  subject: string;
  paper: string;
  language: string;
  publisher: string;
  province: string;
  term: string;
};

type InsertPageConfig = {
  id: string;
  name: string;
  path: string;
};

type InsertPageManifest = {
  pages: InsertPageConfig[];
};

type CustomField = {
  id: string;
  key: string;
  value: string;
};

const INSERT_PAGE_MANIFEST_PATH = "/pdf-insert-pages/manifest.json";

const initialFormState: FormState = {
  document_type: "question_paper",
  description: "",
  year: "",
  grade: "",
  subject: "",
  paper: "P1",
  language: "English",
  publisher: "DBE",
  province: "National",
  term: "November",
};

const documentTypeOptions = [
  { value: "question_paper", label: "Question paper" },
  { value: "memorandum", label: "Memorandum" },
  { value: "study_guide", label: "Study guide" },
  { value: "prospectus", label: "Prospectus" },
];

const gradeOptions = ["8", "9", "10", "11", "12"];
const languageOptions = ["English", "Afrikaans"];
const paperOptions = ["P1", "P2", "P3"];
const publisherOptions = ["DBE", "IEB", "School", "Other"];
const provinceOptions = [
  "National",
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];
const termOptions = [
  "February/March",
  "June",
  "September",
  "November",
  "Trial",
  "Term 1",
  "Term 2",
  "Term 3",
  "Term 4",
];

const sanitizeFileName = (filename: string) =>
  filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");

const buildFolderPath = (form: FormState) => {
  const year = form.year.trim() || "unknown-year";
  const grade = form.grade.trim() || "unknown-grade";

  return `past-exam-papers/${year}/${grade}`;
};

const buildDefaultDescription = (form: FormState) =>
  [
    `Grade ${form.grade}`.trim(),
    form.subject.trim(),
    form.paper.trim(),
    form.term.trim(),
    form.year.trim(),
    form.language.trim(),
    form.document_type === "memorandum" ? "memorandum" : "question paper",
  ]
    .filter(Boolean)
    .join(" ");

const createCustomField = (): CustomField => ({
  id: crypto.randomUUID(),
  key: "",
  value: "",
});

const insertConfiguredPageIntoPdf = async ({
  baseFile,
  insertPage,
  targetPageNumber,
}: {
  baseFile: File;
  insertPage: InsertPageConfig;
  targetPageNumber: number;
}) => {
  const baseBytes = await baseFile.arrayBuffer();
  const insertResponse = await fetch(insertPage.path);

  if (!insertResponse.ok) {
    throw new Error(`Failed to load insert page: ${insertPage.name}`);
  }

  const insertBytes = await insertResponse.arrayBuffer();
  const basePdf = await PDFDocument.load(baseBytes);
  const insertPdf = await PDFDocument.load(insertBytes);

  if (insertPdf.getPageCount() < 1) {
    throw new Error(`Insert file "${insertPage.name}" has no pages.`);
  }

  const [insertedPage] = await basePdf.copyPages(insertPdf, [0]);
  const insertIndex = Math.max(
    0,
    Math.min(basePdf.getPageCount(), targetPageNumber - 1)
  );

  basePdf.insertPage(insertIndex, insertedPage);

  const mergedBytes = await basePdf.save();

  return new File([mergedBytes], baseFile.name, {
    type: "application/pdf",
  });
};

const AdminPostPaper = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.adminAuth.error);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "uploading" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [insertPages, setInsertPages] = useState<InsertPageConfig[]>([]);
  const [insertPageId, setInsertPageId] = useState("");
  const [insertAtPage, setInsertAtPage] = useState("2");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [insertPagesLoading, setInsertPagesLoading] = useState(true);
  const [insertPagesError, setInsertPagesError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadInsertPages = async () => {
      try {
        setInsertPagesLoading(true);
        setInsertPagesError(null);

        const response = await fetch(INSERT_PAGE_MANIFEST_PATH);

        if (!response.ok) {
          throw new Error("Failed to load insert page manifest.");
        }

        const manifest = (await response.json()) as InsertPageManifest;

        if (isMounted) {
          setInsertPages(manifest.pages || []);
        }
      } catch (error) {
        if (isMounted) {
          setInsertPagesError(
            error instanceof Error
              ? error.message
              : "Failed to load insert page manifest."
          );
        }
      } finally {
        if (isMounted) {
          setInsertPagesLoading(false);
        }
      }
    };

    loadInsertPages();

    return () => {
      isMounted = false;
    };
  }, []);

  const descriptionPreview = useMemo(
    () => form.description.trim() || buildDefaultDescription(form),
    [form]
  );

  const selectedInsertPage = useMemo(
    () => insertPages.find((page) => page.id === insertPageId) || null,
    [insertPageId, insertPages]
  );

  const customFieldPreview = useMemo(
    () =>
      customFields.filter(
        (field) => field.key.trim() && field.value.trim()
      ),
    [customFields]
  );

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handleFileSelection = (nextFile: File | null) => {
    if (!nextFile) {
      return;
    }

    if (nextFile.type !== "application/pdf") {
      setFeedback("Only PDF files are supported.");
      setSubmitState("error");
      return;
    }

    setFile(nextFile);
    setFeedback(null);
    setSubmitState("idle");
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleFileSelection(event.dataTransfer.files?.[0] || null);
  };

  const handleCustomFieldChange =
    (fieldId: string, fieldName: "key" | "value") =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setCustomFields((current) =>
        current.map((field) =>
          field.id === fieldId
            ? {
                ...field,
                [fieldName]: event.target.value,
              }
            : field
        )
      );
    };

  const handleAddCustomField = () => {
    setCustomFields((current) => [...current, createCustomField()]);
  };

  const handleRemoveCustomField = (fieldId: string) => {
    setCustomFields((current) => current.filter((field) => field.id !== fieldId));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setSubmitState("error");
      setFeedback("Attach a PDF before submitting.");
      return;
    }

    if (!form.subject.trim() || !form.year.trim() || !form.grade.trim()) {
      setSubmitState("error");
      setFeedback("Year, grade, and subject are required.");
      return;
    }

    if (insertPageId && !selectedInsertPage) {
      setSubmitState("error");
      setFeedback("Select a valid insert page before submitting.");
      return;
    }

    try {
      setSubmitState("uploading");
      setFeedback(
        selectedInsertPage ? "Preparing document and inserting page..." : "Preparing secure upload..."
      );

      let uploadFile = file;

      if (selectedInsertPage) {
        uploadFile = await insertConfiguredPageIntoPdf({
          baseFile: file,
          insertPage: selectedInsertPage,
          targetPageNumber: Number(insertAtPage) || 2,
        });
      }

      const sanitizedFilename = sanitizeFileName(uploadFile.name);
      const folder = buildFolderPath(form);

      const presignResult = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) =>
          adminDocumentsApi.presignUpload(accessToken, {
            filename: sanitizedFilename,
            folder,
            content_type: uploadFile.type || "application/pdf",
          }),
      });

      setFeedback("Uploading PDF to storage...");

      await adminDocumentsApi.uploadToPresignedUrl(
        presignResult.upload_url,
        presignResult.content_type,
        uploadFile
      );

      setSubmitState("submitting");
      setFeedback("Indexing document for search...");

      const flattenedCustomFields = customFields.reduce<Record<string, string>>(
        (accumulator, field) => {
          const key = field.key.trim();
          const value = field.value.trim();

          if (!key || !value) {
            return accumulator;
          }

          accumulator[key] = value;
          return accumulator;
        },
        {}
      );

      const payload: UpsertDocumentRequest = {
        document_type: form.document_type,
        path: presignResult.path,
        description: descriptionPreview,
        year: form.year.trim(),
        grade: form.grade.trim(),
        subject: form.subject.trim(),
        paper: form.paper.trim(),
        language: form.language.trim(),
        publisher: form.publisher.trim(),
        province: form.province.trim(),
        term: form.term.trim(),
        ...flattenedCustomFields,
      };

      const upsertResult = await adminDocumentsApi.upsertDocument(payload);

      setUploadedPath(presignResult.path);
      setSubmitState("success");
      setFeedback(upsertResult.message || "Document posted successfully.");
      setForm(initialFormState);
      setFile(null);
      setInsertPageId("");
      setInsertAtPage("2");
      setCustomFields([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error ? error.message : "Failed to post paper."
      );
    }
  };

  const isBusy = submitState === "uploading" || submitState === "submitting";

  return (
    <Stack spacing={3}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 0,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.18em", color: "#64748b", fontWeight: 700 }}
        >
          Documents
        </Typography>
        <Typography
          variant="h4"
          sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}
        >
          Post a paper
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 760, color: "#475569" }}>
          Upload the PDF to storage using a presigned URL, optionally inject a
          configured one-page PDF, then index the final document in Pinecone.
        </Typography>
      </Paper>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0f172a" }}
                >
                  Document details
                </Typography>
                <Typography sx={{ mt: 1, mb: 3, color: "#64748b" }}>
                  Fill in the metadata that should be searchable after indexing.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Document type"
                      value={form.document_type}
                      onChange={handleChange("document_type")}
                    >
                      {documentTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      placeholder="Mathematics"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={form.year}
                      onChange={handleChange("year")}
                      placeholder="2023"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Grade"
                      value={form.grade}
                      onChange={handleChange("grade")}
                    >
                      {gradeOptions.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          Grade {grade}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Paper"
                      value={form.paper}
                      onChange={handleChange("paper")}
                    >
                      {paperOptions.map((paper) => (
                        <MenuItem key={paper} value={paper}>
                          {paper}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Language"
                      value={form.language}
                      onChange={handleChange("language")}
                    >
                      {languageOptions.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Publisher"
                      value={form.publisher}
                      onChange={handleChange("publisher")}
                    >
                      {publisherOptions.map((publisher) => (
                        <MenuItem key={publisher} value={publisher}>
                          {publisher}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Province"
                      value={form.province}
                      onChange={handleChange("province")}
                    >
                      {provinceOptions.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Term"
                      value={form.term}
                      onChange={handleChange("term")}
                    >
                      {termOptions.map((term) => (
                        <MenuItem key={term} value={term}>
                          {term}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Description"
                      value={form.description}
                      onChange={handleChange("description")}
                      helperText="Leave blank to generate a clean default description from the metadata."
                    />
                  </Grid>
                </Grid>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  backgroundColor: "white",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#0f172a" }}
                    >
                      Custom fields
                    </Typography>
                    <Typography sx={{ mt: 1, color: "#64748b" }}>
                      Add any extra metadata fields and they will be sent as
                      normal top-level fields in the upsert payload.
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleAddCustomField}
                    startIcon={<AddRoundedIcon />}
                    variant="outlined"
                    sx={{ borderRadius: 0 }}
                  >
                    Add field
                  </Button>
                </Stack>

                <Stack spacing={2} sx={{ mt: 3 }}>
                  {customFields.length ? (
                    customFields.map((field) => (
                      <Grid container spacing={2} key={field.id} alignItems="center">
                        <Grid item xs={12} sm={5}>
                          <TextField
                            fullWidth
                            label="Field name"
                            value={field.key}
                            onChange={handleCustomFieldChange(field.id, "key")}
                            placeholder="setwork"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Field value"
                            value={field.value}
                            onChange={handleCustomFieldChange(field.id, "value")}
                            placeholder="Things Fall Apart"
                          />
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          <Button
                            color="inherit"
                            onClick={() => handleRemoveCustomField(field.id)}
                            sx={{
                              minWidth: 0,
                              width: "100%",
                              height: 56,
                              borderRadius: 0,
                              border: "1px solid rgba(148,163,184,0.24)",
                            }}
                          >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </Button>
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Typography sx={{ color: "#64748b" }}>
                      No custom fields added yet.
                    </Typography>
                  )}
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0f172a" }}
                >
                  Insert page
                </Typography>
                <Typography sx={{ mt: 1, mb: 3, color: "#64748b" }}>
                  Choose a configured one-page PDF to inject into the uploaded
                  document before it is sent to storage.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      select
                      fullWidth
                      label="Insert page file"
                      value={insertPageId}
                      onChange={(event) => setInsertPageId(event.target.value)}
                      disabled={insertPagesLoading}
                      helperText={
                        insertPagesLoading
                          ? "Loading configured insert pages..."
                          : insertPages.length
                            ? "Choose a configured one-page PDF or leave empty."
                            : "No insert pages configured in the manifest."
                      }
                    >
                      <MenuItem value="">No insert page</MenuItem>
                      {insertPages.map((page) => (
                        <MenuItem key={page.id} value={page.id}>
                          {page.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Page number"
                      value={insertAtPage}
                      onChange={(event) => setInsertAtPage(event.target.value)}
                      inputProps={{ min: 1 }}
                      helperText="Insert before this page."
                    />
                  </Grid>
                </Grid>

                {selectedInsertPage && (
                  <Typography sx={{ mt: 2, color: "#475569" }}>
                    Selected file: <strong>{selectedInsertPage.name}</strong>
                  </Typography>
                )}
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0f172a" }}
                >
                  PDF upload
                </Typography>
                <Typography sx={{ mt: 1, mb: 2.5, color: "#64748b" }}>
                  Drag and drop a PDF or choose it manually.
                </Typography>

                <Box
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
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
                    Drop PDF here
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: "#64748b" }}>
                    or click to browse from your computer
                  </Typography>
                  <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept="application/pdf"
                    onChange={(event) =>
                      handleFileSelection(event.target.files?.[0] || null)
                    }
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
                      <Typography
                        sx={{ fontWeight: 600, color: "#0f172a" }}
                        noWrap
                      >
                        {file.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#0f172a" }}
                >
                  Submission preview
                </Typography>
                <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Folder:</strong> {buildFolderPath(form)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Description:</strong> {descriptionPreview || "Not set"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>File:</strong> {file?.name || "No file selected"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Insert page:</strong>{" "}
                    {selectedInsertPage
                      ? `${selectedInsertPage.name} at page ${insertAtPage || "2"}`
                      : "No insert page"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Custom fields:</strong>{" "}
                    {customFieldPreview.length
                      ? customFieldPreview
                          .map((field) => `${field.key}: ${field.value}`)
                          .join(", ")
                      : "None"}
                  </Typography>
                </Stack>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isBusy}
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 0,
                    bgcolor: "#0f172a",
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#1e293b",
                      boxShadow: "none",
                    },
                  }}
                >
                  {isBusy ? (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <CircularProgress size={18} sx={{ color: "white" }} />
                      <span>
                        {submitState === "uploading"
                          ? "Uploading..."
                          : "Submitting..."}
                      </span>
                    </Stack>
                  ) : (
                    "Post paper"
                  )}
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {insertPagesError && <Alert severity="warning">{insertPagesError}</Alert>}

      {(feedback || authError) && (
        <Alert
          severity={submitState === "success" ? "success" : "info"}
          icon={submitState === "success" ? <CheckCircleRoundedIcon /> : undefined}
          sx={{ borderRadius: 0 }}
        >
          {feedback || authError}
        </Alert>
      )}

      {uploadedPath && submitState === "success" && (
        <Alert severity="success" sx={{ borderRadius: 0 }}>
          Uploaded file path: {uploadedPath}
        </Alert>
      )}
    </Stack>
  );
};

export default AdminPostPaper;
