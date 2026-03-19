// ─── REPLACE THIS VALUE ──────────────────────────────────────────────────────
// Create a form at https://formspree.io and paste the form ID below.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
// ─────────────────────────────────────────────────────────────────────────────

export async function submitToFormspree(
  data: Record<string, unknown>
): Promise<void> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Formspree submission failed");
  }
}
