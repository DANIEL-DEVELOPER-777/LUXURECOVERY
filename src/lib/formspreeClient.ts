const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

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
