import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import GoldDivider from "@/components/GoldDivider";
import surgeryImg from "@/assets/surgery-or.jpg";
import luxurySuiteImg from "@/assets/luxury-suite.jpg";
import ivTherapyImg from "@/assets/iv-therapy.jpg";
import { supabase } from "@/lib/supabaseClient";
import { submitToFormspree } from "@/lib/formspreeClient";

const valueProps = [
  { title: "Your Results", desc: "Critical Care trained nurses monitor continuously through the highest-risk post-operative hours, trained to recognize complications before they become crises." },
  { title: "Your Reputation", desc: "Every patient recovers at the same standard of precision they experienced in your OR." },
  { title: "Your Time", desc: "A dedicated coordinator handles all communication, logistics, and documentation. You are never chasing updates." },
  { title: "Your Patients' Satisfaction", desc: "A white-glove recovery experience your patients associate with choosing you." },
];

const clinicalStandards = [
  "Structured vital sign monitoring through 48–72 hours",
  "Wound, drain, and medication management per your orders",
  "Real-time escalation to your team when thresholds are crossed",
  "HIPAA-compliant documentation of every intervention",
  "Complete discharge summary delivered to your office at case close",
];

const steps = [
  { num: "1", title: "Connect", desc: "Reach out directly or through our surgeon portal." },
  { num: "2", title: "We Build Your Pathway", desc: "A recovery framework aligned to your post-op instructions and communication preferences." },
  { num: "3", title: "Seamless Handoff, Every Case", desc: "Your office receives direct communication at key clinical milestones and full documentation at case close." },
];

const SurgeonsPage = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    practice: "",
    surgeon: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    try {
      const payload = {
        form_origin: "Surgeons",
        practice_name: formData.practice,
        surgeon_name: formData.surgeon,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };
      const { error: dbError } = await supabase.from("form_submissions").insert([payload]);
      if (dbError) throw new Error(dbError.message);
      await submitToFormspree({ ...payload, _subject: "New Surgeon Partnership Inquiry" });
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <SectionLabel text="FOR SURGEONS" />
              <h1 className="headline-hero mb-6">Your Results Don't End in the OR.</h1>
              <p className="body-copy text-muted-foreground">
                The first 48–72 hours post-operatively are the most fragile period of any surgical outcome.
                Luxurecovery owns that window.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={surgeryImg} alt="Surgical procedure in the operating room" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* What We Are */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe max-w-3xl">
          <ScrollReveal>
            <SectionLabel text="WHAT WE ARE" />
            <h2 className="headline-section mb-6">Recovery Infrastructure. Not a Referral.</h2>
            <p className="body-copy text-muted-foreground mb-4">
              We embed directly into your discharge process — staffed exclusively by Critical Care trained nurses,
              aligned to your protocol, and accountable to your clinical standard.
            </p>
            <p className="body-copy text-muted-foreground">
              This is not private duty nursing. This is the clinical bridge between your OR and your follow-up appointment.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Value */}
      <section className="section-padding">
        <div className="container-luxe max-w-3xl">
          <ScrollReveal>
            <SectionLabel text="THE VALUE" />
            <h2 className="headline-section mb-12">What Partnership Protects</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {valueProps.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.08}>
                <div className="py-5 border-b border-border">
                  <div className="flex items-start gap-4">
                    <span className="text-accent mt-1 shrink-0">—</span>
                    <div>
                      <h3 className="font-display text-lg md:text-xl mb-2">{v.title}</h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground">{v.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <div className="container-luxe">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={luxurySuiteImg} alt="Luxury recovery accommodations" className="w-full h-full object-cover" />
          </div>
        </div>
      </ScrollReveal>

      <GoldDivider />

      {/* Clinical Standard */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe max-w-3xl mx-auto">
          <ScrollReveal>
            <SectionLabel text="THE CLINICAL STANDARD" />
            <h2 className="headline-section mb-6">What Our Nurses Execute</h2>
            <p className="body-copy text-muted-foreground mb-8">Every case follows your discharge instructions as the protocol. Our nurses manage:</p>
            <div className="space-y-4">
              {clinicalStandards.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-3">
                    <span className="text-accent mt-0.5 shrink-0">—</span>
                    <p className="font-body text-sm md:text-base">{item}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Ecosystem */}
      <section className="section-padding">
        <div className="container-luxe max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel text="THE ECOSYSTEM" />
            <h2 className="headline-section mb-8">One Referral. A Complete Recovery.</h2>
            <p className="body-copy mx-auto text-muted-foreground">
              Partner surgeons access a fully coordinated recovery pathway — private discharge transport,
              luxury accommodations, anti-inflammatory nutrition, HBOT at clinical partner facilities, and IV
              nutrient therapy. One coordinator manages everything.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <GoldDivider />

      {/* Partnership */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={ivTherapyImg} alt="IV therapy and clinical recovery" className="w-full h-full object-cover" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <SectionLabel text="PARTNERSHIP" />
              <h2 className="headline-section mb-6">Built Around Your Practice</h2>
              <p className="body-copy text-muted-foreground">
                We work with a select number of practices at any given time. For surgeons with consistent volume,
                we offer an embedded model that makes professional post-operative care the standard expectation
                for every patient — not an optional add-on.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="section-padding">
        <div className="container-luxe">
          <ScrollReveal>
            <SectionLabel text="THE PROCESS" />
            <h2 className="headline-section mb-16">Three Steps</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-display font-light text-6xl text-accent/40 mb-4">{step.num}</p>
                  <h3 className="headline-card mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Contact Form */}
      <section className="section-padding bg-secondary">
        <div className="container-luxe max-w-xl mx-auto">
          <ScrollReveal>
            <h2 className="headline-section text-center mb-8">Inquire About Partnership</h2>
          </ScrollReveal>

          {status === "success" ? (
            <ScrollReveal>
              <div className="text-center">
                <h3 className="headline-card mb-4">Thank You</h3>
                <p className="body-copy mx-auto text-muted-foreground">
                  We will be in touch regarding your partnership inquiry.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Practice Name" name="practice" value={formData.practice} onChange={handleChange} />
                <FormField label="Surgeon Name" name="surgeon" value={formData.surgeon} onChange={handleChange} />
                <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <FormField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                <div>
                  <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p className="font-body text-xs text-red-500">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Submitting…" : "Submit Inquiry"}
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
};

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
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

export default SurgeonsPage;
