// src/hooks/useTodaySession.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

type TodaySession = {
  date: string;
  hadir: string; // e.g. "16 / 18"
  fokus: string;
  catatan: string;
  risiko: string;
};

// If backend not ready, we fall back to mock to keep UI stable.
async function fetchTodaySession(): Promise<TodaySession> {
  try {
    // expected backend: GET /sessions/daily
    const data = await apiFetch("/sessions/daily", { method: "GET" });
    // adapt to expected UI shape; adjust mapping as needed
    return {
      date: data.date ?? "",
      hadir: data.attendance ?? data.hadir ?? "0 / 0",
      fokus: data.focus ?? data.fokus ?? "-",
      catatan: data.notes ?? data.catatan ?? "-",
      risiko: data.risk ?? data.risiko ?? "-",
    };
  } catch {
    // graceful fallback (mock)
    return {
      date: "Today",
      hadir: "0 / 0",
      fokus: "-",
      catatan: "-",
      risiko: "-",
    };
  }
}

export function useTodaySession() {
  return useQuery({
    queryKey: ["today-session"],
    queryFn: fetchTodaySession,
    staleTime: 30_000,
  });
}
