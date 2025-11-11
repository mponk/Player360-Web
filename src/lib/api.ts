// src/lib/api.ts

// Base URL:
// - dev: langsung ke http://localhost:5000
// - prod: same-origin (kosong) supaya lewat Nginx reverse proxy
const API_BASE =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Baca token dari localStorage (dukung dua nama kunci agar backward compatible)
  const token =
    window.localStorage.getItem("p360_token") ??
    window.localStorage.getItem("token") ??
    "";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    // coba baca body untuk debug (jika bukan JSON juga aman)
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText} :: ${text}`);
  }

  return res.json(); // <-- sudah return JSON
}
