import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout wraps all public pages via React Router's <Outlet />.
// Admin pages are registered outside this layout in App.tsx so they
// get NO Navbar / Footer.
const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
