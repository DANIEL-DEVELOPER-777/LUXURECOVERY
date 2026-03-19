import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Recovery", to: "/recovery" },
  { label: "Regenerative", to: "/regenerative" },
  { label: "HBOT", to: "/hbot" },
  { label: "The System", to: "/system" },
  { label: "Surgeons", to: "/surgeons" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBg = scrolled
    ? "bg-background/90 backdrop-blur-md border-b border-border"
    : isHome
    ? "bg-transparent"
    : "bg-background border-b border-border";

  const textColor = scrolled || !isHome ? "text-foreground" : "text-primary-foreground";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="container-luxe flex items-center justify-between h-16 md:h-20">
          <Link to="/" className={`font-display text-lg md:text-xl tracking-[0.15em] ${textColor} transition-colors duration-300`}>
            LUXURECOVERY
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`link-underline font-body font-medium uppercase tracking-[0.12em] text-[11px] ${textColor} transition-colors duration-300`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className={`hidden md:inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-5 py-2.5 border transition-all duration-300 ${
                scrolled || !isHome
                  ? "border-accent text-accent hover:bg-accent hover:text-primary-foreground"
                  : "border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
              }`}
            >
              Reserve
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden ${textColor}`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-foreground flex flex-col"
          >
            <div className="container-luxe flex items-center justify-between h-16">
              <Link to="/" className="font-display text-lg tracking-[0.15em] text-primary-foreground">
                LUXURECOVERY
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-primary-foreground" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="font-display text-3xl md:text-4xl text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 font-body font-medium uppercase tracking-[0.12em] text-sm px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-foreground transition-all"
                >
                  Reserve
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
