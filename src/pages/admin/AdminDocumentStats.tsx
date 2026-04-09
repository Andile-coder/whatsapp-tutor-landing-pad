import { useEffect, useState } from "react";
import {
  Alert,
  Grid,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { useAppDispatch } from "@/store/hooks";
import { runAdminAuthedRequest } from "@/lib/run-admin-authed-request";
import {
  adminDocumentStatsApi,
  DocumentDownloadAggregate,
  DocumentRequestAggregate,
  PaginationMeta,
} from "@/lib/admin-document-stats-api";
import { store } from "@/store";

type SummaryState = {
  downloads: {
    total_documents: number;
    total_downloads: number;
  };
  requests: {
    total_failed_documents: number;
    total_failed_requests: number;
  };
  top_downloads: DocumentDownloadAggregate[];
  top_requests: DocumentRequestAggregate[];
};

const emptySummary: SummaryState = {
  downloads: {
    total_documents: 0,
    total_downloads: 0,
  },
  requests: {
    total_failed_documents: 0,
    total_failed_requests: 0,
  },
  top_downloads: [],
  top_requests: [],
};

const emptyPagination: PaginationMeta = {
  limit: 20,
  offset: 0,
  total: 0,
};

const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 0,
      border: "1px solid rgba(148,163,184,0.18)",
      backgroundColor: "white",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Stack spacing={1}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.14em", color: "#64748b", fontWeight: 700 }}
        >
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
          {value.toLocaleString()}
        </Typography>
      </Stack>
      {icon}
    </Stack>
  </Paper>
);

const AdminDocumentStats = () => {
  const dispatch = useAppDispatch();
  const [summary, setSummary] = useState<SummaryState>(emptySummary);
  const [downloads, setDownloads] = useState<DocumentDownloadAggregate[]>([]);
  const [requests, setRequests] = useState<DocumentRequestAggregate[]>([]);
  const [downloadsPagination, setDownloadsPagination] =
    useState<PaginationMeta>(emptyPagination);
  const [requestsPagination, setRequestsPagination] =
    useState<PaginationMeta>(emptyPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDocumentStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await runAdminAuthedRequest({
          dispatch,
          getState: store.getState,
          requestFn: async (accessToken) => {
            const [summaryResponse, downloadsResponse, requestsResponse] =
              await Promise.all([
                adminDocumentStatsApi.getSummary(accessToken),
                adminDocumentStatsApi.getDownloads(accessToken, 20, 0),
                adminDocumentStatsApi.getRequests(accessToken, 20, 0),
              ]);

            return {
              summary: summaryResponse.summary,
              downloads: downloadsResponse.downloads,
              downloadsPagination: downloadsResponse.pagination,
              requests: requestsResponse.requests,
              requestsPagination: requestsResponse.pagination,
            };
          },
        });

        if (isMounted) {
          setSummary(result.summary);
          setDownloads(result.downloads);
          setDownloadsPagination(result.downloadsPagination);
          setRequests(result.requests);
          setRequestsPagination(result.requestsPagination);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load document activity."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDocumentStats();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

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
        <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 700, color: "#0f172a" }}>
          Document activity
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 820, color: "#475569" }}>
          These views are backed by aggregate tracking tables. They show counts
          and latest timestamps by document name, not a raw event log for every
          single attempt.
        </Typography>
      </Paper>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <Paper
          elevation={0}
        sx={{
          p: 6,
          borderRadius: 0,
          border: "1px solid rgba(148,163,184,0.18)",
          backgroundColor: "white",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={28} />
            <Typography sx={{ color: "#475569" }}>
              Loading document activity...
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                label="Total Downloads"
                value={summary.downloads.total_downloads}
                icon={<DownloadRoundedIcon sx={{ color: "#1d4ed8" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                label="Downloaded Documents"
                value={summary.downloads.total_documents}
                icon={<DescriptionRoundedIcon sx={{ color: "#0f172a" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                label="Failed Requests"
                value={summary.requests.total_failed_requests}
                icon={<ErrorOutlineRoundedIcon sx={{ color: "#b45309" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                label="Failed Documents"
                value={summary.requests.total_failed_documents}
                icon={<QueryStatsRoundedIcon sx={{ color: "#7c3aed" }} />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <BoxHeader
                  title="Document downloads"
                  subtitle={`${downloadsPagination.total} aggregated rows`}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 760 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8fafc" }}>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Document
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Downloads
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Last download
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Path
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {downloads.length ? (
                        downloads.map((item) => (
                          <TableRow key={`${item.document_name}-${item.updated_at}`} hover>
                            <TableCell>
                              <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                                {item.document_name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#64748b" }}>
                                Updated {item.updated_at}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "#334155" }}>
                              {item.download_count}
                            </TableCell>
                            <TableCell sx={{ color: "#334155" }}>
                              {item.last_download}
                            </TableCell>
                            <TableCell sx={{ maxWidth: 240 }}>
                              <Link
                                href={item.document_path}
                                target="_blank"
                                rel="noreferrer"
                                underline="hover"
                                sx={{
                                  display: "inline-block",
                                  color: "#1d4ed8",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: "100%",
                                }}
                              >
                                {item.document_path}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <EmptyTableRow
                          colSpan={4}
                          message="No downloads have been aggregated yet."
                        />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} xl={6}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 0,
                  border: "1px solid rgba(148,163,184,0.18)",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <BoxHeader
                  title="Failed document requests"
                  subtitle={`${requestsPagination.total} aggregated rows`}
                />
                <TableContainer>
                  <Table sx={{ minWidth: 760 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8fafc" }}>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Document
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Query
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Failed count
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#334155" }}>
                          Last request
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requests.length ? (
                        requests.map((item) => (
                          <TableRow key={`${item.document_name}-${item.updated_at}`} hover>
                            <TableCell>
                              <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                                {item.document_name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#64748b" }}>
                                Updated {item.updated_at}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "#334155" }}>
                              {item.query_text}
                            </TableCell>
                            <TableCell sx={{ color: "#334155" }}>
                              {item.request_count}
                            </TableCell>
                            <TableCell sx={{ color: "#334155" }}>
                              {item.last_request}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <EmptyTableRow
                          colSpan={4}
                          message="No failed requests have been aggregated yet."
                        />
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
};

const BoxHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <Stack spacing={0.5} sx={{ px: 3, py: 2.5, borderBottom: "1px solid rgba(148,163,184,0.18)" }}>
    <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
      {title}
    </Typography>
    <Typography sx={{ color: "#64748b" }}>{subtitle}</Typography>
  </Stack>
);

const EmptyTableRow = ({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) => (
  <TableRow>
    <TableCell colSpan={colSpan} sx={{ py: 8 }}>
      <Stack spacing={1} alignItems="center">
        <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
          Nothing to show yet
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          {message}
        </Typography>
      </Stack>
    </TableCell>
  </TableRow>
);

export default AdminDocumentStats;
