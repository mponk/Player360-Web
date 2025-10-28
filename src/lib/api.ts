// src/lib/api.ts

// Decide base URL for API calls.
// - In production (container behind Nginx), we want SAME ORIGIN: "" (empty).
//   So /auth/login -> http://34.50.117.132/auth/login -> routed to backend.
// - In local dev, we can talk to backend on localhost:5000 directly.
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000" // local dev only
    : ""; // production -> same origin

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  // always send JSON by default unless caller overrides
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Read token from localStorage if available
  const token = window.localStorage.getItem("p360_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // optionally you can throw something smarter later
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}
