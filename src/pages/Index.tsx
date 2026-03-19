import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { submitToFormspree } from "@/lib/formspreeClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldDivider from "@/components/GoldDivider";
import heroImg from "@/assets/hero-suite.jpg";
import hbotClinicalImg from "@/assets/hbot-clinical.jpg";
import nurseCareImg from "@/assets/nurse-care.jpg";
import penthouseImg from "@/assets/penthouse-aerial.jpg";
import executiveImg from "@/assets/executive-recovery.jpg";
import internationalImg from "@/assets/international-travel.jpg";

const bundles = [
  {
    name: "Initial Overnight",
    price: "Starting at $2,250",
    duration: "12 Hours",
    features: ["From post-op pickup until the following morning", "Around the clock care", "IV Hydration/Vitamin Therapy", "Drain and wound care", "Sequential compression devices used", "Case specific recovery supplies provided"],
    gold: false,
    includes: null,
  },
  {
    name: "Advanced",
    price: "Starting at $7,200",
    duration: "48 Hours",
    features: ["Initial overnight plus three 12-hour shifts", "48 hours of continuous care", "Concierge assistance arranging all adjunct therapies and accommodations, coordinated by a lead nurse", "All transportation during this time included", "Additional IV therapies available"],
    gold: false,
    includes: "Includes everything in Initial Overnight",
  },
  {
    name: "Premier",
    price: "Starting at $10,000",
    duration: "72 Hours",
    features: ["Extended continuous nursing care", "Full concierge assistance", "All transportation included"],
    gold: false,
    includes: "Includes everything in Advanced",
  },
  {
    name: "Prestige",
    price: "Starting at $20,000",
    duration: "5 Days",
    features: ["Around the clock private duty nursing", "5 medical-grade HBOT sessions", "NAD or Niagen IV Therapy", "Chef prepared anti-inflammatory meals"],
    gold: true,
    includes: "Includes everything in Premier",
  },
];

const protocols = [
  { name: "LUMINAE", price: "$38,000/year", desc: "Your cellular foundation" },
  { name: "NOVARE", price: "$72,000/year", desc: "Built for performance" },
  { name: "SOVEREIGN", price: "$110,000/year", desc: "Nothing rationed" },
  { name: "AUREUS", price: "$150,000/year", desc: "The only membership of its kind" },
];

const steps = [
  "Surgeon Referral or Direct Consultation",
  "Personalized Recovery Plan",
  "Discharge Escort + In-Suite Setup",
  "Advanced Monitoring",
  "Continued Regenerative Support",
];

const differentiators = [
  "Critical Care and PACU Trained Private Duty Nurses",
  "All trained in aesthetics recovery",
  "Direct Communication With Your Surgeon",
  "Luxury Transport",
  "Medical Grade Hyperbaric Oxygen Therapy",
  "FDA 351(a) MSC Exosome Therapy",
  "Personalized IV & Peptide Programs",
  "Case specific recovery supplies provided",
  "White-Glove Logistics + Care Coordination",
];

const clientTypes = [
  { title: "Aesthetic Surgery Clients", desc: "Your result deserves a protected recovery.", img: nurseCareImg },
  { title: "International Patients", desc: "We coordinate everything from arrival to full recovery.", img: internationalImg },
  { title: "High-Net-Worth Individuals", desc: "White-glove care at the intersection of privacy and precision.", img: penthouseImg },
  { title: "Executives & Entrepreneurs", desc: "Minimize downtime. Maximize results.", img: executiveImg },
  { title: "Longevity & Biohacking Enthusiasts", desc: "Recovery is your next performance optimization.", img: hbotClinicalImg },
];

const Index = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury recovery suite with Manhattan skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative container-luxe pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-accent-light mb-6">
              PRIVATE CONCIERGE RECOVERY
            </p>
            <h1 className="headline-hero text-primary-foreground max-w-4xl mb-8">
              The Gold Standard in<br />Post-Operative Care
            </h1>
            <p className="font-body text-primary-foreground/70 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              Critical care trained private duty nurses. Protocols based on thousands of hours recovering patients. Exclusive IV and peptide therapies. Anti-inflammatory meals prepared by a private chef. Black car service with trained chauffeurs. Elite hotel collaborations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl">
              <Link
                to="/contact"
                className="font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-3 border border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all"
              >
                Reserve Private Recovery
              </Link>
              <Link
                to="/surgeons"
                className="font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-foreground transition-all"
              >
                Surgeon Collaboration
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section-padding">
        <div className="container-luxe max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel text="THE REALITY OF RECOVERY" />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-light italic text-3xl md:text-5xl lg:text-6xl leading-[1.2] mb-10 text-balance">
              "You chose the best surgeon.<br />
              But what happens after<br />
              you leave the operating room?"
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="body-copy mx-auto text-muted-foreground mb-8">
              Prescriptions. Pain management. Drain tubes. Positioning challenges. Swelling. Confusion.
              And no medical professional at your bedside.
            </p>
            <p className="body-copy mx-auto text-muted-foreground">
              Recovery is where outcomes are protected — or compromised.
            </p>
          </ScrollReveal>
          <GoldDivider />
          <ScrollReveal delay={0.3}>
            <p className="font-display text-2xl md:text-3xl italic">
              That's where Luxurecovery steps in.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <SectionLabel text="THE DIFFERENCE" />
                <h2 className="font-display font-light italic text-3xl md:text-4xl lg:text-5xl leading-[1.2] lg:sticky lg:top-32">
                  We do not send sitters. We send critical care professionals.
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {differentiators.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 py-4 border-b border-border">
                      <span className="text-accent mt-1">—</span>
                      <p className="font-body text-base md:text-lg">{item}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOVERY BUNDLES */}
      <section className="section-padding">
        <div className="container-luxe">
          <ScrollReveal>
            <SectionLabel text="RECOVERY PACKAGES" />
            <h2 className="headline-section mb-16">Tailored to Your Recovery</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {bundles.map((bundle, i) => (
              <ScrollReveal key={bundle.name} delay={i * 0.1}>
                <div className={bundle.gold ? "card-luxe-gold h-full flex flex-col" : "card-luxe h-full flex flex-col"}>
                  <h3 className="headline-card mb-2">{bundle.name}</h3>
                  <p className="price-display text-accent mb-1">{bundle.price}</p>
                  <p className="font-body text-sm text-muted-foreground mb-4">{bundle.duration}</p>
                  {bundle.includes && (
                    <p className="font-body text-xs text-accent italic mb-4">{bundle.includes}</p>
                  )}
                  <ul className="space-y-2 mt-auto">
                    {bundle.features.map((f) => (
                      <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent text-xs mt-1">·</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/recovery" className="link-underline font-body font-medium uppercase tracking-[0.12em] text-[11px] text-accent mt-6 inline-block">
                    Learn More
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REGENERATIVE PROGRAMS */}
      <section className="section-padding bg-foreground">
        <div className="container-luxe">
          <ScrollReveal>
            <p className="eyebrow text-accent mb-6">/ REGENERATIVE OPTIMIZATION</p>
            <h2 className="headline-section text-primary-foreground mb-16 text-balance">
              Beyond Recovery.<br />A New Standard of Longevity.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {protocols.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div className="border border-accent/30 p-8 md:p-10">
                  <p className="eyebrow text-accent mb-3">{p.name}</p>
                  <p className="font-display font-light text-2xl text-primary-foreground/60 mb-3">{p.price}</p>
                  <p className="font-body text-primary-foreground/50 text-sm">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.4}>
            <p className="font-body text-primary-foreground/30 text-xs text-center mt-8 tracking-wide mb-8">
              Annual membership. Personalized to your biology.
            </p>
            <div className="text-center">
              <Link
                to="/regenerative"
                className="inline-flex font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-3 border border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-foreground transition-all"
              >
                Explore Regenerative Programs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding">
        <div className="container-luxe">
          <ScrollReveal>
            <SectionLabel text="THE PROCESS" />
            <h2 className="headline-section mb-16">Five Steps to Recovery</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <p className="font-display font-light text-6xl md:text-7xl text-accent/40 mb-4">{i + 1}</p>
                  <p className="font-body text-sm md:text-base">{step}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block w-full h-px bg-accent/20 mt-8" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe">
          <ScrollReveal>
            <SectionLabel text="WHO WE SERVE" />
            <h2 className="headline-section mb-16">Exceptional Care for Exceptional Clients</h2>
          </ScrollReveal>
          <div className="space-y-16 md:space-y-24">
            {clientTypes.map((client, i) => (
              <ScrollReveal key={client.title} delay={0.1}>
                <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <h3 className="headline-card mb-3">{client.title}</h3>
                    <p className="body-copy text-muted-foreground">{client.desc}</p>
                  </div>
                  <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={client.img}
                        alt={client.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HBOT TEASER */}
      <section className="section-padding">
        <div className="container-luxe">
          <div className="max-w-3xl">
            <ScrollReveal>
              <SectionLabel text="MEDICAL GRADE HBOT" />
              <h2 className="headline-section mb-6">
                Medical Grade<br />Hyperbaric Oxygen Therapy
              </h2>
              <p className="body-copy text-muted-foreground mb-8">
                Clinician-coordinated hyperbaric oxygen therapy delivered through our partnerships with MD Hyperbaric (Manhattan) and Hyperbaric Medical Solutions — the same medical-grade chambers used in hospital wound care and elite sports medicine.
              </p>
              <ul className="space-y-3 mb-8">
                {["Accelerates repair of surgical incisions", "Elevates dissolved oxygen in plasma", "Reduces post-surgical swelling", "Enhances collagen production for wound integrity"].map((b) => (
                  <li key={b} className="font-body text-sm flex items-center gap-3">
                    <span className="text-accent">·</span> {b}
                  </li>
                ))}
              </ul>
              <Link to="/hbot" className="link-underline font-body font-medium uppercase tracking-[0.12em] text-[11px] text-accent flex items-center gap-2">
                Explore HBOT <ArrowRight size={14} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="relative py-32 md:py-44">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Luxury recovery environment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container-luxe text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="eyebrow text-accent-light mb-6">/ ABOUT LUXURECOVERY</p>
            <h2 className="font-display font-light italic text-3xl md:text-5xl text-primary-foreground leading-[1.2] mb-8 text-balance">
              "Recovery deserves the same level of excellence as surgery."
            </h2>
            <p className="font-body text-primary-foreground/60 text-base md:text-lg max-w-xl mx-auto mb-8">
              Founded by critical care trained nurses and regenerative specialists,
              Luxurecovery was built on one principle:
              this is not home care. This is private recovery.
            </p>
            <Link to="/about" className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-primary-foreground/70 hover:text-primary-foreground transition-colors flex items-center gap-2 justify-center">
              Our Story <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* RESERVE FORM */}
      <ReserveSection />
    </>
  );
};

function ReserveSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", procedure: "", date: "", surgeon: "", location: "", package: "", notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    try {
      const payload = {
        form_origin: "Home",
        full_name: formData.name,
        procedure: formData.procedure,
        surgery_date: formData.date || null,
        surgeon_name: formData.surgeon,
        location: formData.location,
        preferred_package: formData.package,
        notes: formData.notes,
      };
      const { error: dbError } = await supabase.from("form_submissions").insert([payload]);
      if (dbError) throw new Error(dbError.message);
      await submitToFormspree({ ...payload, _subject: "New Consultation Request – Home" });
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="section-padding">
        <div className="container-luxe max-w-2xl mx-auto text-center">
          <h2 className="headline-section mb-6">Thank You</h2>
          <p className="body-copy mx-auto text-muted-foreground">
            Your consultation request has been received. A member of our team will be in touch within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-luxe max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="headline-section text-center mb-4">Reserve Your Recovery Experience</h2>
          <p className="font-body text-center text-muted-foreground mb-12">All consultations are strictly confidential.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
            <FormField label="Procedure / Surgery Type" name="procedure" type="text" value={formData.procedure} onChange={handleChange} />
            <FormField label="Surgery Date" name="date" type="date" value={formData.date} onChange={handleChange} />
            <FormField label="Surgeon Name" name="surgeon" type="text" value={formData.surgeon} onChange={handleChange} />
            <FormField label="Location (City / Hotel / Residence)" name="location" type="text" value={formData.location} onChange={handleChange} />
            <div>
              <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">Preferred Package</label>
              <select name="package" value={formData.package} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors">
                <option value="">Select a package…</option>
                <optgroup label="Recovery Packages">
                  <option>Initial Overnight — Starting at $2,250</option>
                  <option>Advanced (48 Hours) — Starting at $7,200</option>
                  <option>Premier (72 Hours) — Starting at $10,000</option>
                  <option>Prestige (5 Days) — Starting at $20,000</option>
                </optgroup>
                <optgroup label="HBOT Sessions">
                  <option>HBOT Single Session — $350</option>
                  <option>HBOT Post-Op Protocol — $350/session (5-session min)</option>
                </optgroup>
                <optgroup label="Recovery System">
                  <option>Recovery System — $325–$395</option>
                </optgroup>
                <optgroup label="Regenerative Memberships">
                  <option>Luminae — $38,000/year</option>
                  <option>Novare — $72,000/year</option>
                  <option>Sovereign — $110,000/year</option>
                  <option>Aureus — $150,000/year</option>
                </optgroup>
                <option>Other / Not Sure</option>
              </select>
            </div>
            <div>
              <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">Notes / Special Requests</label>
              <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            {status === "error" && errorMsg && (
              <p className="font-body text-xs text-red-500">{errorMsg}</p>
            )}
            <button type="submit" disabled={status === "loading"} className="w-full font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {status === "loading" ? "Submitting…" : "Request Private Consultation"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

export default Index;
