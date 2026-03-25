
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthBootstrapper from "@/components/routing/AuthBootstrapper";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import PublicOnlyRoute from "@/components/routing/PublicOnlyRoute";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAccount = lazy(() => import("./pages/admin/AdminAccount"));
const AdminSecurity = lazy(() => import("./pages/admin/AdminSecurity"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminPostPaper = lazy(() => import("./pages/admin/AdminPostPaper"));

const queryClient = new QueryClient();

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-600">
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
                  path="users"
                  element={
                    <Suspense fallback={<RouteLoader />}>
                      <AdminUsers />
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

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthBootstrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
