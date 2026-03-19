import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "react-router-dom";
import hbotImg from "@/assets/hbot-chamber.jpg";
import hbotSessionImg from "@/assets/hbot-session.jpg";

const benefits = [
  { title: "Wound Healing", desc: "Accelerates repair of surgical incisions and surrounding tissue." },
  { title: "Tissue Perfusion", desc: "Elevates dissolved oxygen in plasma, improving circulation to healing areas." },
  { title: "Inflammation Reduction", desc: "Reduces post-surgical swelling and supports faster resolution of bruising." },
  { title: "Collagen Synthesis", desc: "Enhances collagen production for improved wound integrity and skin quality." },
  { title: "Cellular Recovery", desc: "Supports deep tissue regeneration as part of an ongoing longevity protocol." },
];

const whoItsFor = [
  "Post-surgical recovery clients",
  "Elite and professional athletes",
  "Longevity and biohacking enthusiasts",
  "Anti-aging and aesthetic rejuvenation patients",
  "Membership clients seeking ongoing regenerative optimization",
];

const membershipTiers = [
  {
    name: "Novare",
    desc: "10 sessions per year at our partner facilities. The clinical foundation of your ongoing recovery and longevity protocol.",
  },
  {
    name: "Sovereign",
    desc: "20 sessions per year at our partner facilities, plus access to an OxyHealth Vitaeris 320 in-home chamber for between-session maintenance. The Vitaeris is structured as a lease-to-own — by the end of year one, it's yours.",
  },
  {
    name: "Aureus",
    desc: "Everything in Sovereign, with concierge coordination built in for sessions needed while traveling domestically or internationally.",
  },
];

const HBOTPage = () => (
  <div className="pt-20">
    {/* Hero */}
    <section className="section-padding">
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <SectionLabel text="MEDICAL GRADE HBOT" />
            <h1 className="headline-hero mb-6">Medical Grade Hyperbaric Oxygen Therapy</h1>
            <p className="body-copy text-muted-foreground">
              Clinician-coordinated hyperbaric oxygen therapy — available as a standalone post-surgical protocol or as part of a Luxurecovery membership program, delivered through our partnerships with two of the leading medical-grade HBOT facilities in the country.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={hbotImg} alt="Medical-grade hyperbaric oxygen therapy chamber" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* What Is HBOT */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel text="WHAT IS HBOT" />
          <h2 className="headline-section mb-8">What Is HBOT?</h2>
          <p className="body-copy mx-auto text-muted-foreground">
            Hyperbaric Oxygen Therapy involves breathing pure oxygen in a pressurized environment. This increases oxygen concentration in your blood, accelerating tissue repair, reducing post-surgical inflammation, and supporting your body's natural healing processes at the cellular level.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Our Partners */}
    <section className="section-padding">
      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <SectionLabel text="OUR PARTNERS" />
            <h2 className="headline-section mb-8">MD Hyperbaric & Hyperbaric Medical Solutions</h2>
            <p className="body-copy text-muted-foreground">
              We've partnered with MD Hyperbaric (Manhattan) and Hyperbaric Medical Solutions to give our clients access to true medical-grade hyperbaric chambers — the same technology used in hospital wound care and elite sports medicine. Every session is surgeon-cleared and fully coordinated by your Luxurecovery concierge coordinator, so you never have to manage the logistics of your own recovery.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={hbotSessionImg} alt="Patient receiving HBOT session in monoplace chamber" className="w-full h-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* The Protocol */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="THE PROTOCOL" />
          <h2 className="headline-section mb-8">Post-Op Protocol</h2>
          <p className="body-copy text-muted-foreground">
            For qualifying clients, we recommend one optional pre-operative session to prime tissue oxygenation before surgery. Following discharge, a minimum of 5 post-surgical sessions begins within 24–48 hours — coordinated entirely by your Luxurecovery concierge coordinator.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Membership HBOT */}
    <section className="section-padding">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionLabel text="MEMBERSHIP HBOT" />
          <h2 className="headline-section mb-4">For Members — Partner Facility Sessions + In-Home Access</h2>
          <p className="body-copy text-muted-foreground mb-12 max-w-3xl">
            Luxurecovery members receive structured annual HBOT packages delivered at MD Hyperbaric and Hyperbaric Medical Solutions, with in-home access added at higher tiers.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipTiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 0.1}>
              <div className="card-luxe h-full">
                <p className="eyebrow mb-3">{tier.name}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe">
        <ScrollReveal>
          <SectionLabel text="THE BENEFITS" />
          <h2 className="headline-section mb-12">Why HBOT</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.1}>
              <div className="card-luxe">
                <h3 className="headline-card mb-3">{b.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Who It's For */}
    <section className="section-padding">
      <div className="container-luxe max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="WHO IT'S FOR" />
          <h2 className="headline-section mb-8">Ideal Candidates</h2>
          <ul className="space-y-4">
            {whoItsFor.map((item) => (
              <li key={item} className="flex items-center gap-4 font-body text-lg">
                <span className="text-accent">—</span> {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>

    {/* Pricing */}
    <section className="section-padding bg-secondary">
      <div className="container-luxe max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <SectionLabel text="PRICING" />
          <h2 className="headline-section mb-12">Session Rates</h2>
          <div className="space-y-6 text-left">
            <div className="card-luxe flex items-center justify-between">
              <span className="font-display text-xl">Single Session</span>
              <span className="price-display text-accent">$350</span>
            </div>
            <div className="card-luxe">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">Post-Op Protocol</span>
                <span className="price-display text-accent">$350/session</span>
              </div>
              <p className="font-body text-sm text-muted-foreground mt-2">5-session minimum</p>
            </div>
            <div className="card-luxe-gold flex items-center justify-between">
              <span className="font-display text-xl">Membership</span>
              <span className="price-display text-accent">Novare, Sovereign & Aureus</span>
            </div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
            >
              Book a Session
            </Link>
            <Link
              to="/regenerative"
              className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-primary-foreground transition-all"
            >
              Explore Memberships
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default HBOTPage;
