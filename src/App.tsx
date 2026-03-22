import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* ── Public site — uses Layout (Navbar + Footer via Outlet) ── */}
          <Route element={<Layout />}>
            <Route path="/"            element={<Index />} />
            <Route path="/recovery"    element={<Recovery />} />
            <Route path="/regenerative" element={<Regenerative />} />
            <Route path="/hbot"        element={<HBOTPage />} />
            <Route path="/system"      element={<SystemPage />} />
            <Route path="/surgeons"    element={<SurgeonsPage />} />
            <Route path="/about"       element={<AboutPage />} />
            <Route path="/contact"     element={<ContactPage />} />
            <Route path="*"            element={<NotFound />} />
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
