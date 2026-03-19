import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldDivider from "@/components/GoldDivider";
import { Link } from "react-router-dom";
import productsImg from "@/assets/system-products.jpg";

const phases = [
  {
    name: "RESTORE",
    days: "Days 1–7",
    desc: "The critical window. Targeted anti-inflammatory compounds, medical-grade probiotics, and cellular repair substrates lay the foundation for clean, complication-free healing. Every capsule is calibrated to reduce oxidative stress and support tissue integrity from the inside out.",
  },
  {
    name: "REBUILD",
    days: "Days 8–14",
    desc: "Structural recovery begins. Collagen precursors, bioavailable minerals, and targeted amino acids support connective tissue regeneration. The body transitions from acute healing to active reconstruction.",
  },
  {
    name: "REVIVE",
    days: "Days 15–21",
    desc: "Energy returns. Mitochondrial support compounds, adaptogenic botanicals, and advanced B-complex formulations restore vitality. Sleep quality improves. Mental clarity sharpens.",
  },
  {
    name: "RECHARGE",
    days: "Days 22–30",
    desc: "Optimization phase. Longevity-focused nutraceuticals, antioxidant complexes, and cellular maintenance compounds ensure your recovery momentum becomes a lasting baseline of elevated performance.",
  },
];

const SystemPage = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="section-padding bg-foreground">
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <SectionLabel text="THE SYSTEM" />
            <h1 className="headline-hero text-primary-foreground mb-6">
              The Luxurecovery System™
            </h1>
            <p className="font-display font-light italic text-xl text-primary-foreground/60 mb-6">
              30-Day Cellular Renewal
            </p>
            <p className="font-body text-primary-foreground/50 text-base leading-relaxed max-w-lg">
              Four precision-phased supplement protocols designed to support
              your body through every stage of recovery and beyond.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={productsImg} alt="LuxeRecovery System luxury packaging" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Phases */}
    {phases.map((phase, i) => (
      <section key={phase.name} className={`section-padding ${i % 2 === 0 ? "" : "bg-secondary"}`}>
        <div className="container-luxe">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <p className="font-display font-light text-7xl md:text-8xl text-accent/30 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="eyebrow text-accent mb-2">{phase.name}</p>
                <p className="font-display font-light italic text-xl text-muted-foreground">{phase.days}</p>
              </div>
              <div className="lg:col-span-8">
                <p className="body-copy text-muted-foreground">{phase.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    ))}

    <GoldDivider />

    {/* Pricing & CTA */}
    <section className="section-padding">
      <div className="container-luxe max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel text="PRICING" />
          <h2 className="headline-section mb-6">Invest in Your Recovery</h2>
          <p className="price-display text-accent mb-2">$325 – $395</p>
          <p className="font-body text-muted-foreground text-sm mb-4">Retail pricing. Available wholesale to surgeons.</p>
          <p className="font-display italic text-lg text-muted-foreground mb-12">
            "Luxury packaging. Clinical precision. Capsule simplicity."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
            >
              Purchase
            </Link>
            <Link
              to="/surgeons"
              className="font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-primary-foreground transition-all"
            >
              Inquire for Wholesale
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default SystemPage;
