import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Recovery", to: "/recovery" },
  { label: "Regenerative", to: "/regenerative" },
  { label: "HBOT", to: "/hbot" },
  { label: "The System", to: "/system" },
  { label: "Surgeons", to: "/surgeons" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container-luxe py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
        <Link to="/" className="font-display text-xl tracking-[0.15em]">
          LUXURECOVERY
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="link-underline font-body font-medium uppercase tracking-[0.12em] text-[11px] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:text-right">
          <Link
            to="/contact"
            className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-5 py-2.5 border border-accent text-accent hover:bg-accent hover:text-foreground transition-all"
          >
            Reserve
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/40 font-body text-xs tracking-wide">
        <p>© 2025 Luxurecovery. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>·</span>
          <span>Terms</span>
          <span>·</span>
          <span>HIPAA Compliant</span>
          <span>·</span>
          <span>Licensed Nurses</span>
          <span>·</span>
          <span>New York, NY</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
