import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

// ─── AdminSetPassword ─────────────────────────────────────────────────────────
// Supabase invite/reset emails redirect here with a URL like:
//   /admin/set-password#access_token=XXX&refresh_token=YYY&type=invite
//
// The onAuthStateChange event fires at client-init time (before this component
// mounts), creating a race condition. We fix this by manually reading the hash
// and calling supabase.auth.setSession() ourselves — no timing dependency.

const AdminSetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 1️⃣ Parse the hash fragment from the URL
      const hash = window.location.hash.substring(1); // strip leading #
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token") ?? "";
      const type = params.get("type"); // 'invite' | 'recovery'

      if (accessToken && (type === "invite" || type === "recovery")) {
        // 2️⃣ Establish the session explicitly — no race condition
        const { data, error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          setInitError(sessionError.message);
          return;
        }

        if (data.session) {
          setReady(true);
          return;
        }
      }

      // 3️⃣ Fallback — maybe client already handled the hash (fast environments)
      const { data: existing } = await supabase.auth.getSession();
      if (existing.session) {
        setReady(true);
        return;
      }

      // 4️⃣ Nothing worked — token missing or invalid
      setInitError(
        "This link is invalid or has already been used. Please request a new invite."
      );
    };

    init();
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
    setTimeout(() => navigate("/admin"), 1500);
  };

  // ── Shared shell ──────────────────────────────────────────────────────────
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

        {/* States */}
        {success ? (
          <div className="text-center">
            <p className="font-body text-sm text-muted-foreground">
              Password set. Redirecting to dashboard…
            </p>
          </div>
        ) : initError ? (
          <div className="text-center space-y-4">
            <p className="font-body text-sm text-red-500">{initError}</p>
            <button
              onClick={() => navigate("/admin/login")}
              className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Go to Login →
            </button>
          </div>
        ) : !ready ? (
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
