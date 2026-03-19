import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/lib/supabaseClient";
import { submitToFormspree } from "@/lib/formspreeClient";

const ContactPage = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    procedure: "",
    date: "",
    surgeon: "",
    location: "",
    package: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    try {
      const payload = {
        form_origin: "Contact",
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
      await submitToFormspree({ ...payload, _subject: "New Consultation Request – Contact" });
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-luxe max-w-2xl mx-auto">
          <ScrollReveal>
            <h1 className="headline-hero text-center mb-4">Reserve Your Recovery Experience</h1>
            <p className="font-body text-center text-muted-foreground mb-16">
              All inquiries handled with the utmost discretion.
            </p>
          </ScrollReveal>

          {status === "success" ? (
            <ScrollReveal>
              <div className="text-center py-16">
                <h2 className="headline-section mb-6">Thank You</h2>
                <p className="body-copy mx-auto text-muted-foreground">
                  Your consultation request has been received. A member of our concierge team
                  will be in touch within 24 hours.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <Field label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <Field label="Procedure / Surgery Type" name="procedure" value={formData.procedure} onChange={handleChange} />
                <Field label="Surgery Date" name="date" type="date" value={formData.date} onChange={handleChange} />
                <Field label="Surgeon Name" name="surgeon" value={formData.surgeon} onChange={handleChange} />
                <Field label="Location (City / Hotel / Residence)" name="location" value={formData.location} onChange={handleChange} />
                <div>
                  <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">
                    Preferred Package
                  </label>
                  <select
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                  >
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
                  <label className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2 block">
                    Notes / Special Requests
                  </label>
                  <textarea
                    name="notes"
                    rows={5}
                    value={formData.notes}
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
                  {status === "loading" ? "Submitting…" : "Request Private Consultation"}
                </button>
              </form>
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.3}>
            <div className="mt-16 pt-12 border-t border-border text-center space-y-3">
              <p className="font-body text-sm text-muted-foreground">
                Private Inquiry Line: <span className="text-foreground">(347) 277-3848</span>
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Email: <span className="text-foreground">concierge@luxurecovery.com</span>
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Met Tower, 142 W 57th St, Suite 923, New York, NY 10019
              </p>
              <p className="font-body text-xs text-muted-foreground mt-6">
                All consultations are strictly confidential.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

function Field({
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

export default ContactPage;
