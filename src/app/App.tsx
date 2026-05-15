import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthBootstrapper from "@/features/auth/components/AuthBootstrapper";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import PublicOnlyRoute from "@/features/auth/components/PublicOnlyRoute";
import Index from "@/pages/Index";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Feedback from "@/pages/Feedback";
import NotFound from "@/pages/NotFound";

const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AdminLogin = lazy(() => import("@/features/auth/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/features/dashboard/pages/AdminDashboard"));
const AdminAccount = lazy(() => import("@/features/settings/pages/AdminAccount"));
const AdminSecurity = lazy(() => import("@/features/settings/pages/AdminSecurity"));
const AdminUsers = lazy(() => import("@/features/users/pages/AdminUsers"));
const AdminPostPaper = lazy(() => import("@/features/documents/pages/AdminPostPaper"));
const AdminAnalyzePaper = lazy(() => import("@/features/documents/pages/AdminAnalyzePaper"));
const AdminUserCreate = lazy(() => import("@/features/users/pages/AdminUserCreate"));
const AdminUserDetail = lazy(() => import("@/features/users/pages/AdminUserDetail"));
const AdminDocumentStats = lazy(() => import("@/features/document-activity/pages/AdminDocumentStats"));
const SupportInboxPage = lazy(() => import("@/features/support/pages/SupportInboxPage"));
const SupportNotesPage = lazy(() => import("@/features/support/pages/SupportNotesPage"));
const SupportContactsPage = lazy(() => import("@/features/support/pages/SupportContactsPage"));
const SupportMacrosPage = lazy(() => import("@/features/support/pages/SupportMacrosPage"));
const SupportReportsPage = lazy(() => import("@/features/support/pages/SupportReportsPage"));
const SupportContactDetailPage = lazy(() => import("@/features/support/pages/SupportContactDetailPage"));
const SupportMacroDetailPage = lazy(() => import("@/features/support/pages/SupportMacroDetailPage"));
const SupportReportsOverviewPage = lazy(() => import("@/features/support/pages/SupportReportsOverviewPage"));
const SupportReportsAgentsPage = lazy(() => import("@/features/support/pages/SupportReportsAgentsPage"));
const SupportReportsChannelsPage = lazy(() => import("@/features/support/pages/SupportReportsChannelsPage"));
const SupportReportsSlaPage = lazy(() => import("@/features/support/pages/SupportReportsSlaPage"));
const SupportReportsCsatPage = lazy(() => import("@/features/support/pages/SupportReportsCsatPage"));
const SupportReportsVolumePage = lazy(() => import("@/features/support/pages/SupportReportsVolumePage"));

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-600">
    Loading...
  </div>
);

const App = () => (
  <BrowserRouter>
    <AuthBootstrapper>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route path="/feedback" element={<Feedback />} />

        <Route element={<PublicOnlyRoute />}>
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<RouteLoader />}>
                <AdminLogin />
              </Suspense>
            }
          />
        </Route>

        <Route path="/admin" element={<ProtectedRoute />}>
          <Route
            element={
              <Suspense fallback={<RouteLoader />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="support"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportInboxPage />
                </Suspense>
              }
            />
            <Route
              path="support/notes"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportNotesPage />
                </Suspense>
              }
            />
            <Route
              path="support/contacts"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportContactsPage />
                </Suspense>
              }
            />
            <Route
              path="support/contacts/:contactId"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportContactDetailPage />
                </Suspense>
              }
            />
            <Route
              path="support/macros"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportMacrosPage />
                </Suspense>
              }
            />
            <Route
              path="support/macros/:macroId"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportMacroDetailPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/overview"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsOverviewPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/agents"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsAgentsPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/channels"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsChannelsPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/sla"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsSlaPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/csat"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsCsatPage />
                </Suspense>
              }
            />
            <Route
              path="support/reports/volume"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <SupportReportsVolumePage />
                </Suspense>
              }
            />
            <Route
              path="users"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminUsers />
                </Suspense>
              }
            />
            <Route
              path="users/new"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminUserCreate />
                </Suspense>
              }
            />
            <Route
              path="users/:waId"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminUserDetail />
                </Suspense>
              }
            />
            <Route
              path="papers/new"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminPostPaper />
                </Suspense>
              }
            />
            <Route
              path="papers/analyze"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminAnalyzePaper />
                </Suspense>
              }
            />
            <Route
              path="document-activity"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminDocumentStats />
                </Suspense>
              }
            />
            <Route
              path="account"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminAccount />
                </Suspense>
              }
            />
            <Route
              path="security"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <AdminSecurity />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthBootstrapper>
  </BrowserRouter>
);

export default App;
