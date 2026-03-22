import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

// ─── Types ────────────────────────────────────────────────────────────────────
type FormOrigin = "Home" | "Contact" | "Surgeons" | "Regenerative" | "All";

interface Submission {
  id: string;
  created_at: string;
  form_origin: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  procedure: string | null;
  surgery_date: string | null;
  surgeon_name: string | null;
  location: string | null;
  preferred_package: string | null;
  notes: string | null;
  practice_name: string | null;
  message: string | null;
  tier: string | null;
  is_current_client: string | null;
  referral_source: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Cell({ v }: { v: string | null | undefined }) {
  if (!v) return <span className="text-muted-foreground/30">—</span>;
  return <span className="truncate max-w-[160px] block" title={v}>{v}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<FormOrigin>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Change-password modal
  const [showPwModal, setShowPwModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch submissions
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "All") {
        query = query.eq("form_origin", filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setSubmissions((data as Submission[]) ?? []);
      }

      setLoading(false);
    };

    fetchData();
  }, [filter, refreshKey]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwLoading(true);
    setPwMsg(null);

    const { error: pwError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (pwError) {
      setPwMsg({ type: "error", text: pwError.message });
    } else {
      setPwMsg({ type: "success", text: "Password updated successfully." });
      setNewPassword("");
    }

    setPwLoading(false);
  };

  const filters: FormOrigin[] = ["All", "Home", "Contact", "Surgeons", "Regenerative"];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-10">
        <div className="flex items-center gap-4">
          <p className="font-body font-medium uppercase tracking-[0.15em] text-[11px] text-muted-foreground">
            Luxurecovery
          </p>
          <span className="text-border">|</span>
          <h1 className="font-display font-light text-lg">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={loading}
            title="Refresh submissions"
            className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 flex items-center gap-1.5"
          >
            {/* Refresh icon — spins while loading */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className={loading ? "animate-spin" : ""}
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            Refresh
          </button>
          <button
            onClick={() => { setShowPwModal(true); setPwMsg(null); }}
            className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Change Password
          </button>
          <button
            onClick={handleSignOut}
            className="font-body font-medium uppercase tracking-[0.12em] text-[11px] px-4 py-2 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="px-6 py-8 max-w-screen-2xl mx-auto">
        {/* Stats Row */}
        <div><i style={{ fontSize: '12px' }}>The below box are clickable to filter the submissions</i></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {filters.map((f) => {
            const count = f === "All"
              ? submissions.length
              : submissions.filter((s) => s.form_origin === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-left p-4 border transition-all ${filter === f
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/40"
                  }`}
              >
                <p className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-1">
                  {f}
                </p>
                <p className="font-display font-light text-2xl">
                  {f === "All"
                    ? submissions.length
                    : submissions.filter((s) => s.form_origin === f).length}
                </p>
              </button>
            );
          })}
        </div>

        {/* Filter Label */}
        <div className="flex items-center justify-between mb-4">
          <p className="font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground">
            Showing:{" "}
            <span className="text-accent">
              {filter} ({submissions.filter((s) => filter === "All" || s.form_origin === filter).length})
            </span>
          </p>
        </div>

        {/* Table */}
        {loading && (
          <p className="font-body text-sm text-muted-foreground py-12 text-center">
            Loading submissions…
          </p>
        )}

        {error && (
          <p className="font-body text-sm text-red-500 py-12 text-center">
            Error: {error}
          </p>
        )}

        {!loading && !error && submissions.length === 0 && (
          <p className="font-body text-sm text-muted-foreground py-12 text-center">
            No submissions yet.
          </p>
        )}

        {!loading && !error && submissions.length > 0 && (
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left font-body text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  {[
                    "Date",
                    "Form",
                    "Name",
                    "Email",
                    "Phone",
                    "Procedure",
                    "Surgery Date",
                    "Surgeon",
                    "Location",
                    "Package",
                    "Practice",
                    "Tier",
                    "Current Client",
                    "Referral",
                    "Notes / Message",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-body font-medium uppercase tracking-[0.1em] text-[10px] text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((row, i) => (
                  <tr
                    key={row.id}
                    className={`border-b border-border hover:bg-secondary/50 transition-colors ${i % 2 === 0 ? "" : "bg-secondary/20"
                      }`}
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground text-xs">
                      {fmt(row.created_at)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-body font-medium uppercase tracking-[0.1em] text-[10px] text-accent">
                        {row.form_origin}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.full_name} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.email} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.phone} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.procedure} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.surgery_date} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.surgeon_name} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.location} /></td>
                    <td className="px-4 py-3"><Cell v={row.preferred_package} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.practice_name} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.tier} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.is_current_client} /></td>
                    <td className="px-4 py-3 whitespace-nowrap"><Cell v={row.referral_source} /></td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <Cell v={row.notes ?? row.message} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Change Password Modal */}
      {showPwModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 px-6">
          <div className="bg-background border border-border p-8 w-full max-w-sm">
            <h2 className="font-display font-light text-2xl mb-1">Change Password</h2>
            <div className="w-6 h-px bg-accent mb-6" />
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block font-body font-medium uppercase tracking-[0.12em] text-[11px] text-muted-foreground mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {pwMsg && (
                <p
                  className={`font-body text-xs ${pwMsg.type === "success" ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {pwMsg.text}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={pwLoading}
                  className="flex-1 font-body font-medium uppercase tracking-[0.12em] text-[11px] px-4 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-all disabled:opacity-40"
                >
                  {pwLoading ? "Updating…" : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPwModal(false)}
                  className="flex-1 font-body font-medium uppercase tracking-[0.12em] text-[11px] px-4 py-3 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
