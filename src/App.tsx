import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Recovery from "./pages/Recovery";
import Regenerative from "./pages/Regenerative";
import HBOTPage from "./pages/HBOT";
import SystemPage from "./pages/System";
import SurgeonsPage from "./pages/Surgeons";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSetPassword from "./pages/admin/SetPassword";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

// ─── AuthRedirectHandler ──────────────────────────────────────────────────────
// Supabase invite/reset emails redirect to the site's root URL by default,
// landing the user on the home page with the auth hash attached.
// This component runs on every page render, detects that hash, and immediately
// sends the user to /admin/set-password — where it can be correctly processed.
const AuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.substring(1));
    const type = params.get("type");
    const token = params.get("access_token");

    if (token && (type === "invite" || type === "recovery")) {
      // Preserve the full hash so SetPassword can read it
      navigate("/admin/set-password" + hash, { replace: true });
    }
  }, [navigate]);

  return null;
};
// ─────────────────────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthRedirectHandler />
        <Routes>

          {/* ── Public site — uses Layout (Navbar + Footer via Outlet) ── */}
          <Route element={<Layout />}>
            <Route path="/"             element={<Index />} />
            <Route path="/recovery"     element={<Recovery />} />
            <Route path="/regenerative" element={<Regenerative />} />
            <Route path="/hbot"         element={<HBOTPage />} />
            <Route path="/system"       element={<SystemPage />} />
            <Route path="/surgeons"     element={<SurgeonsPage />} />
            <Route path="/about"        element={<AboutPage />} />
            <Route path="/contact"      element={<ContactPage />} />
            <Route path="*"             element={<NotFound />} />
          </Route>

          {/* ── Admin — no Layout wrapper ── */}
          <Route path="/admin/login"        element={<AdminLogin />} />
          <Route path="/admin/set-password" element={<AdminSetPassword />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
