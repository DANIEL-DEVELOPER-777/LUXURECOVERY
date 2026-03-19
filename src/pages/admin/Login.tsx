import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Luxurecovery
          </p>
          <h1 className="font-display font-light text-3xl md:text-4xl">
            Admin Portal
          </h1>
          <div className="w-8 h-px bg-accent mx-auto mt-6" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
