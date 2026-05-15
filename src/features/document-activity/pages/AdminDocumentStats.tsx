import { useEffect, useState } from "react";
import {
  Alert,
  Grid,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
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
import { runAdminAuthedRequest } from "@/features/auth/lib/runAdminAuthedRequest";
import {
  adminDocumentStatsApi,
  DocumentDownloadAggregate,
  DocumentRequestAggregate,
  PaginationMeta,
} from "@/features/document-activity/api/adminDocumentStatsApi";
import { store } from "@/store";
import AdminEmptyState from "@/components/shared/AdminEmptyState";
import AdminSectionHeader from "@/components/shared/AdminSectionHeader";
import AdminStatCard from "@/components/shared/AdminStatCard";
import AdminSurface from "@/components/shared/AdminSurface";
import AdminTableSurface from "@/components/shared/AdminTableSurface";

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
      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <AdminSurface sx={{ p: 6 }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress size={28} />
            <Typography sx={{ color: "#475569" }}>
              Loading document activity...
            </Typography>
          </Stack>
        </AdminSurface>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <AdminStatCard
                label="Total Downloads"
                value={summary.downloads.total_downloads}
                icon={<DownloadRoundedIcon sx={{ color: "#1d4ed8" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <AdminStatCard
                label="Downloaded Documents"
                value={summary.downloads.total_documents}
                icon={<DescriptionRoundedIcon sx={{ color: "#0f172a" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <AdminStatCard
                label="Failed Requests"
                value={summary.requests.total_failed_requests}
                icon={<ErrorOutlineRoundedIcon sx={{ color: "#b45309" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <AdminStatCard
                label="Failed Documents"
                value={summary.requests.total_failed_documents}
                icon={<QueryStatsRoundedIcon sx={{ color: "#7c3aed" }} />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} xl={6}>
              <AdminSurface sx={{ overflow: "hidden" }}>
                <AdminSectionHeader
                  title="Document downloads"
                  subtitle={`${downloadsPagination.total} aggregated rows`}
                />
                <AdminTableSurface minWidth={760}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Document</TableCell>
                        <TableCell>Downloads</TableCell>
                        <TableCell>Last download</TableCell>
                        <TableCell>Path</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {downloads.length ? (
                        downloads.map((item) => (
                          <TableRow key={`${item.document_name}-${item.updated_at}`} hover>
                            <TableCell>
                              <Typography sx={{ fontWeight: 800, color: "#101828" }}>
                                {item.document_name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#64748b" }}>
                                Updated {item.updated_at}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {item.download_count}
                            </TableCell>
                            <TableCell>
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
                                  color: "#3641f5",
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
                </AdminTableSurface>
              </AdminSurface>
            </Grid>

            <Grid item xs={12} xl={6}>
              <AdminSurface sx={{ overflow: "hidden" }}>
                <AdminSectionHeader
                  title="Failed document requests"
                  subtitle={`${requestsPagination.total} aggregated rows`}
                />
                <AdminTableSurface minWidth={760}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Document</TableCell>
                        <TableCell>Query</TableCell>
                        <TableCell>Failed count</TableCell>
                        <TableCell>Last request</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requests.length ? (
                        requests.map((item) => (
                          <TableRow key={`${item.document_name}-${item.updated_at}`} hover>
                            <TableCell>
                              <Typography sx={{ fontWeight: 800, color: "#101828" }}>
                                {item.document_name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#64748b" }}>
                                Updated {item.updated_at}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {item.query_text}
                            </TableCell>
                            <TableCell>
                              {item.request_count}
                            </TableCell>
                            <TableCell>
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
                </AdminTableSurface>
              </AdminSurface>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
};

const EmptyTableRow = ({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) => (
  <TableRow>
    <TableCell colSpan={colSpan}>
      <AdminEmptyState title="Nothing to show yet" message={message} />
    </TableCell>
  </TableRow>
);

export default AdminDocumentStats;
