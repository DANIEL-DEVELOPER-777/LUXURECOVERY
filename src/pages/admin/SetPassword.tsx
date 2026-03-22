import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useEffect } from "react";

// ─── AdminSetPassword ─────────────────────────────────────────────────────────
// This page is the landing spot for Supabase invite & password-reset emails.
// Supabase appends #access_token=...&type=invite to the URL.
// The supabase client picks up the hash automatically and fires onAuthStateChange.

const AdminSetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // The Supabase client auto-processes the URL hash (#access_token=...).
    // If a session already exists (token was valid), mark as ready.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (
          (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") &&
          session
        ) {
          setReady(true);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/admin"), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-8 h-px bg-accent mx-auto mb-6" />
          <h2 className="font-display font-light text-2xl mb-3">Password Set</h2>
          <p className="font-body text-sm text-muted-foreground">
            Redirecting to dashboard…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Luxurecovery
          </p>
          <h1 className="font-display font-light text-3xl md:text-4xl">
            Set Your Password
          </h1>
          <div className="w-8 h-px bg-accent mx-auto mt-6" />
        </div>

        {!ready ? (
          <p className="font-body text-sm text-muted-foreground text-center tracking-widest uppercase animate-pulse">
            Verifying link…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2">
                New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {error && (
              <p className="font-body text-xs text-red-500 pt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-body font-medium uppercase tracking-[0.12em] text-[11px] px-6 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Saving…" : "Confirm & Access Dashboard"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSetPassword;
