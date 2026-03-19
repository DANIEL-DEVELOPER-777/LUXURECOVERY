import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldDivider from "@/components/GoldDivider";
import { Link } from "react-router-dom";
import recoveryImg from "@/assets/recovery-rest.jpg";

const nursingServices = [
  { name: "Initial Overnight Shift", price: "$2,250" },
  { name: "Additional 12-Hour Shift", price: "$1,750" },
  { name: "Lead Nurse Coordination", price: "Included" },
  { name: "Luxury Transport", price: "Included" },
];

const inclusions = [
  "Medication management", "Drain care", "Garment assistance",
  "Positioning", "Vital sign monitoring", "IV Hydration/Vitamin Therapy", "Wound care",
  "Sequential compression devices",
];

const bundles = [
  {
    name: "Initial Overnight", price: "Starting at $2,250", duration: "12 Hours",
    features: ["From post-op pickup until the following morning", "Around the clock care", "IV Hydration/Vitamin Therapy", "Drain and wound care", "Sequential compression devices used", "Case specific recovery supplies provided"],
    includes: null,
  },
  {
    name: "Advanced", price: "Starting at $7,200", duration: "48 Hours",
    features: ["Initial overnight plus three 12-hour shifts", "48 hours of continuous care", "Concierge assistance arranging all adjunct therapies and accommodations, coordinated by a lead nurse", "All transportation during this time included", "Additional IV therapies available"],
    includes: "Includes everything in Initial Overnight",
  },
  {
    name: "Premier", price: "Starting at $10,000", duration: "72 Hours",
    features: ["Extended continuous nursing care", "Full concierge assistance", "All transportation included"],
    includes: "Includes everything in Advanced",
  },
  {
    name: "Prestige", price: "Starting at $20,000", duration: "5 Days", gold: true,
    features: ["Around the clock private duty nursing", "5 Medical grade HBOT sessions", "NAD or Niagen IV Therapy", "Chef prepared anti-inflammatory meals"],
    includes: "Includes everything in Premier",
  },
];

const Recovery = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="section-padding">
      <div className="container-luxe max-w-4xl">
        <ScrollReveal>
          <SectionLabel text="RECOVERY SERVICES" />
          <h1 className="headline-hero mb-6">Private Duty Critical Care Nursing</h1>
          <p className="body-copy text-muted-foreground">
            Your recovery is not an afterthought. It is the moment that determines your outcome.
            We provide critical care trained private duty nurses to your hotel suite, residence, or recovery home.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Hero Image */}
    <section className="container-luxe mb-16">
      <ScrollReveal>
        <div className="aspect-[21/9] overflow-hidden">
          <img src={recoveryImg} alt="Serene recovery environment" className="w-full h-full object-cover" />
        </div>
      </ScrollReveal>
    </section>

    {/* Core Services */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionLabel text="CORE NURSING SERVICES" />
          <h2 className="headline-section mb-12">Private Nursing Rates</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {nursingServices.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.08}>
              <div className="card-luxe flex items-center justify-between">
                <h3 className="font-display text-xl">{s.name}</h3>
                <p className="font-display font-light text-2xl text-accent">{s.price}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <h3 className="headline-card mb-6">Service Inclusions</h3>
          <div className="flex flex-wrap gap-3">
            {inclusions.map((item) => (
              <span key={item} className="font-body text-sm text-muted-foreground border border-border px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    <GoldDivider />

    {/* Recovery Bundles */}
    <section className="section-padding">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionLabel text="RECOVERY PACKAGES" />
          <h2 className="headline-section mb-16">Complete Recovery Bundles</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map((bundle, i) => (
            <ScrollReveal key={bundle.name} delay={i * 0.1}>
              <div className={bundle.gold ? "card-luxe-gold h-full" : "card-luxe h-full"}>
                <h3 className="headline-card mb-2">{bundle.name}</h3>
                <p className="price-display text-accent mb-1">{bundle.price}</p>
                <p className="font-body text-sm text-muted-foreground mb-2">{bundle.duration}</p>
                {bundle.includes && (
                  <p className="font-body text-xs text-accent/80 italic mb-6">{bundle.includes}</p>
                )}
                {!bundle.includes && <div className="mb-4" />}
                <ul className="space-y-3">
                  {bundle.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent text-xs mt-1">·</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <Link
              to="/contact"
              className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
            >
              Reserve Your Recovery
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Recovery;
