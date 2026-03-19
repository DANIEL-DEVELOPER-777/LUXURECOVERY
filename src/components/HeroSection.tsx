import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.04)_0%,_transparent_70%)]" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold mb-8">
            Luxurecovery
          </p>
        </motion.div>

        <motion.h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          Membership is Coming.
        </motion.h1>

        <motion.p
          className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          Luxurecovery is launching a limited annual membership program for clients who view
          their biology as a long-term investment. Four tiers. Precision biologics. Ongoing
          concierge care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <button
            onClick={scrollToForm}
            className="group relative inline-flex items-center font-body text-sm tracking-[0.15em] uppercase px-10 py-4 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-500"
          >
            Request Early Access
          </button>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gold/20" />
    </section>
  );
};

export default HeroSection;
