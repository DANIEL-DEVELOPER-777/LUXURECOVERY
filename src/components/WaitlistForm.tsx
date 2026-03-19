import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { submitToFormspree } from "@/lib/formspreeClient";

const WaitlistForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    tier: "",
    currentClient: "",
    referral: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    try {
      const payload = {
        form_origin: "Regenerative",
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        tier: form.tier,
        is_current_client: form.currentClient,
        referral_source: form.referral,
        notes: form.notes,
      };
      const { error: dbError } = await supabase.from("form_submissions").insert([payload]);
      if (dbError) throw new Error(dbError.message);
      await submitToFormspree({ ...payload, _subject: "New Regenerative Membership Request" });
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="waitlist-form" className="py-24 sm:py-32 px-6">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-px h-12 bg-gold/30 mx-auto mb-8" />
          <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-6">
            You're on the list.
          </h2>
          <p className="font-body text-muted-foreground font-light leading-relaxed">
            A Luxurecovery coordinator will be in touch shortly to discuss your membership.
          </p>
        </motion.div>
      </section>
    );
  }

  const inputClasses =
    "w-full bg-secondary/50 border border-border/60 px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-colors duration-300";
  const labelClasses =
    "block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2";
  const selectClasses =
    "w-full bg-secondary/50 border border-border/60 px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:border-gold/40 transition-colors duration-300 appearance-none";

  return (
    <section id="waitlist-form" className="py-24 sm:py-32 px-6">
      <div className="max-w-xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">
            Limited Membership
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-6">
            Request Early Access
          </h2>
          <p className="font-body text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
            Membership is limited. Complete the form below and a Luxurecovery coordinator will
            reach out to discuss the right tier for your goals.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div>
            <label htmlFor="fullName" className={labelClasses}>Full Name</label>
            <input type="text" id="fullName" name="fullName" required value={form.fullName} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
            <input type="email" id="email" name="email" required value={form.email} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label htmlFor="phone" className={labelClasses}>Phone Number</label>
            <input type="tel" id="phone" name="phone" required value={form.phone} onChange={handleChange} className={inputClasses} />
          </div>

          <div>
            <label htmlFor="tier" className={labelClasses}>Which tier interests you most?</label>
            <div className="relative">
              <select id="tier" name="tier" required value={form.tier} onChange={handleChange} className={selectClasses}>
                <option value="">Select a tier</option>
                <option value="luminae">Luminae</option>
                <option value="novare">Novare</option>
                <option value="sovereign">Sovereign</option>
                <option value="aureus">Aureus</option>
                <option value="not-sure">Not sure yet</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="currentClient" className={labelClasses}>Are you a current Luxurecovery client?</label>
            <div className="relative">
              <select id="currentClient" name="currentClient" required value={form.currentClient} onChange={handleChange} className={selectClasses}>
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="referral" className={labelClasses}>How did you hear about us?</label>
            <div className="relative">
              <select id="referral" name="referral" required value={form.referral} onChange={handleChange} className={selectClasses}>
                <option value="">Select</option>
                <option value="surgeon">Surgeon referral</option>
                <option value="friend">Friend or family</option>
                <option value="social">Social media</option>
                <option value="google">Google</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/50">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className={labelClasses}>Anything you'd like us to know? (Optional)</label>
            <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange} className={inputClasses + " resize-none"} />
          </div>

          {status === "error" && errorMsg && (
            <p className="font-body text-xs text-red-500">{errorMsg}</p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gold-gradient font-body text-sm tracking-[0.15em] uppercase px-10 py-4 text-primary-foreground hover:opacity-90 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Submitting…" : "Request My Access"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default WaitlistForm;
