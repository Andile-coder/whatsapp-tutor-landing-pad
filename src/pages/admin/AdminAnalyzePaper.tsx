import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PdfFileDropzone from "@/components/admin/PdfFileDropzone";
import {
  AnalyzeDocumentResponse,
  UpsertDocumentRequest,
  adminDocumentsApi,
} from "@/lib/admin-documents-api";
import {
  BaseDocumentFormState,
  buildPaperFolderPath,
  documentTypeOptions,
  gradeOptions,
  languageOptions,
  paperOptions,
  provinceOptions,
  publisherOptions,
  sanitizeFileName,
  termOptions,
} from "@/lib/admin-paper-form";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type AnalyzeFormState = BaseDocumentFormState & {
  title: string;
  exam_type: string;
  keywords: string;
};

const initialFormState: AnalyzeFormState = {
  document_type: "question_paper",
  description: "",
  year: "",
  grade: "",
  subject: "",
  paper: "",
  language: "English",
  publisher: "",
  province: "",
  term: "",
  title: "",
  exam_type: "",
  keywords: "",
};

const buildAnalysisFolderPath = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");

  return `document-analysis/${year}/${month}`;
};

const mapAnalysisToForm = (
  document: AnalyzeDocumentResponse["document"]
): AnalyzeFormState => ({
  document_type: document.document_type || "question_paper",
  description: document.summary || "",
  year: document.year || "",
  grade: document.grade || "",
  subject: document.subject || "",
  paper: document.paper || "",
  language: document.language || "English",
  publisher: document.publisher || "",
  province: document.province || "",
  term: document.term || "",
  title: document.title || "",
  exam_type: document.exam_type || "",
  keywords: (document.keywords || []).join(", "),
});

const AdminAnalyzePaper = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.adminAuth.error);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<AnalyzeFormState>(initialFormState);
  const [analysisPath, setAnalysisPath] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "analyzing" | "ready" | "publishing" | "success" | "error"
  >("idle");

  const keywordsPreview = useMemo(
    () =>
      form.keywords
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    [form.keywords]
  );

  const handleFormChange =
    (field: keyof AnalyzeFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
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
    setForm(initialFormState);
    setWarnings([]);
    setAnalysisPath(null);
    setFeedback(null);
    setSubmitState("idle");
  };

  const handleAnalyze = async () => {
    if (!file) {
      setSubmitState("error");
      setFeedback("Attach a PDF before running analysis.");
      return;
    }

    try {
      setSubmitState("analyzing");
      setFeedback("Uploading file for analysis...");

      const sanitizedFilename = sanitizeFileName(file.name);

      const presignResult = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) =>
          adminDocumentsApi.presignUpload(accessToken, {
            filename: sanitizedFilename,
            folder: buildAnalysisFolderPath(),
            content_type: file.type || "application/pdf",
          }),
      });

      await adminDocumentsApi.uploadToPresignedUrl(
        presignResult.upload_url,
        presignResult.content_type,
        file
      );

      setFeedback("Analyzing uploaded document...");

      const analysisResult = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) =>
          adminDocumentsApi.analyzeDocument(accessToken, {
            path: presignResult.path,
          }),
      });

      setAnalysisPath(analysisResult.document.path);
      setForm(mapAnalysisToForm(analysisResult.document));
      setWarnings(analysisResult.document.warnings || []);
      setSubmitState("ready");
      setFeedback("Draft metadata generated. Review the fields and publish when ready.");
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Failed to analyze uploaded document."
      );
    }
  };

  const handlePublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setSubmitState("error");
      setFeedback("Attach a PDF before publishing.");
      return;
    }

    if (!form.subject.trim() || !form.year.trim() || !form.grade.trim()) {
      setSubmitState("error");
      setFeedback("Year, grade, and subject are required before publishing.");
      return;
    }

    try {
      setSubmitState("publishing");
      setFeedback("Uploading final document...");

      const sanitizedFilename = sanitizeFileName(file.name);
      const folder = buildPaperFolderPath(form);

      const presignResult = await runAdminAuthedRequest({
        dispatch,
        getState: store.getState,
        requestFn: (accessToken) =>
          adminDocumentsApi.presignUpload(accessToken, {
            filename: sanitizedFilename,
            folder,
            content_type: file.type || "application/pdf",
          }),
      });

      await adminDocumentsApi.uploadToPresignedUrl(
        presignResult.upload_url,
        presignResult.content_type,
        file
      );

      setFeedback("Indexing document for search...");

      const payload: UpsertDocumentRequest = {
        document_type: form.document_type.trim(),
        path: presignResult.path,
        description: form.description.trim(),
        year: form.year.trim(),
        grade: form.grade.trim(),
        subject: form.subject.trim(),
        paper: form.paper.trim(),
        language: form.language.trim(),
        publisher: form.publisher.trim(),
        province: form.province.trim(),
        term: form.term.trim(),
        title: form.title.trim(),
        exam_type: form.exam_type.trim(),
        filename: sanitizedFilename,
        ...(keywordsPreview.length ? { keywords: keywordsPreview } : {}),
      };

      const upsertResult = await adminDocumentsApi.upsertDocument(payload);

      setSubmitState("success");
      setFeedback(upsertResult.message || "Document published successfully.");
      setAnalysisPath(presignResult.path);
    } catch (error) {
      setSubmitState("error");
      setFeedback(
        error instanceof Error ? error.message : "Failed to publish document."
      );
    }
  };

  const isAnalyzing = submitState === "analyzing";
  const isPublishing = submitState === "publishing";
  const canPublish = submitState === "ready" || submitState === "publishing" || submitState === "success";

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
          Analyze and publish
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 800, color: "#475569" }}>
          Drop a PDF, generate draft metadata from the analysis endpoint, edit
          the results, and then publish it through the normal upload and upsert
          flow.
        </Typography>
      </Paper>

      <Box component="form" onSubmit={handlePublish}>
        <Grid container spacing={3}>
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  PDF upload
                </Typography>
                <Typography sx={{ mt: 1, mb: 2.5, color: "#64748b" }}>
                  Use the same drag-and-drop upload flow, then let the backend
                  suggest the metadata for review.
                </Typography>

                <PdfFileDropzone file={file} onFileSelect={handleFileSelection} />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAnalyze}
                  disabled={!file || isAnalyzing || isPublishing}
                  startIcon={
                    isAnalyzing ? undefined : <AutoAwesomeRoundedIcon />
                  }
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
                  {isAnalyzing ? (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <CircularProgress size={18} sx={{ color: "white" }} />
                      <span>Analyzing...</span>
                    </Stack>
                  ) : (
                    "Analyze document"
                  )}
                </Button>
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  Analysis preview
                </Typography>
                <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Temporary analysis path:</strong>{" "}
                    {analysisPath || "No analysis run yet"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Final folder:</strong> {buildPaperFolderPath(form)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    <strong>Keywords:</strong>{" "}
                    {keywordsPreview.length ? keywordsPreview.join(", ") : "None"}
                  </Typography>
                </Stack>

                {warnings.length ? (
                  <Stack spacing={1} sx={{ mt: 3 }}>
                    <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Warnings
                    </Typography>
                    {warnings.map((warning) => (
                      <Alert key={warning} severity="warning" sx={{ borderRadius: 0 }}>
                        {warning}
                      </Alert>
                    ))}
                  </Stack>
                ) : (
                  <Typography sx={{ mt: 3, color: "#64748b" }}>
                    No analysis warnings returned.
                  </Typography>
                )}
              </Paper>
            </Stack>
          </Grid>

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
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  Review analyzed fields
                </Typography>
                <Typography sx={{ mt: 1, mb: 3, color: "#64748b" }}>
                  The fields below come from <strong>`POST /v4/admin/documents/analyze`</strong>.
                  Edit anything before publishing.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      value={form.title}
                      onChange={handleFormChange("title")}
                      placeholder="Grade 12 Mathematics Paper 1 May/June 2024"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Document type"
                      value={form.document_type}
                      onChange={handleFormChange("document_type")}
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
                      label="Exam type"
                      value={form.exam_type}
                      onChange={handleFormChange("exam_type")}
                      placeholder="exam_paper"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      value={form.subject}
                      onChange={handleFormChange("subject")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={form.year}
                      onChange={handleFormChange("year")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      select
                      fullWidth
                      label="Grade"
                      value={form.grade}
                      onChange={handleFormChange("grade")}
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
                      onChange={handleFormChange("paper")}
                    >
                      {paperOptions.map((paper) => (
                        <MenuItem key={paper} value={paper}>
                          {paper}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Language"
                      value={form.language}
                      onChange={handleFormChange("language")}
                    >
                      {languageOptions.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Term"
                      value={form.term}
                      onChange={handleFormChange("term")}
                    >
                      {termOptions.map((term) => (
                        <MenuItem key={term} value={term}>
                          {term}
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
                      onChange={handleFormChange("publisher")}
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
                      onChange={handleFormChange("province")}
                    >
                      <MenuItem value="">None</MenuItem>
                      {provinceOptions.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Keywords"
                      value={form.keywords}
                      onChange={handleFormChange("keywords")}
                      helperText="Comma-separated values will be sent as the keywords field."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Description"
                      value={form.description}
                      onChange={handleFormChange("description")}
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
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  Publish
                </Typography>
                <Typography sx={{ mt: 1, color: "#64748b" }}>
                  When you publish, the original PDF is uploaded through the
                  normal document flow and then indexed using the reviewed
                  metadata above.
                </Typography>

                {keywordsPreview.length ? (
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
                    {keywordsPreview.map((keyword) => (
                      <Chip
                        key={keyword}
                        label={keyword}
                        sx={{
                          borderRadius: 0,
                          bgcolor: "#e2e8f0",
                          color: "#0f172a",
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Stack>
                ) : null}

                <Button
                  type="submit"
                  fullWidth
                  disabled={!canPublish || isPublishing}
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
                  {isPublishing ? (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <CircularProgress size={18} sx={{ color: "white" }} />
                      <span>Publishing...</span>
                    </Stack>
                  ) : (
                    "Publish document"
                  )}
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {(feedback || authError) && (
        <Alert
          severity={submitState === "success" ? "success" : submitState === "error" ? "error" : "info"}
          icon={submitState === "success" ? <CheckCircleRoundedIcon /> : undefined}
          sx={{ borderRadius: 0 }}
        >
          {feedback || authError}
        </Alert>
      )}
    </Stack>
  );
};

export default AdminAnalyzePaper;
