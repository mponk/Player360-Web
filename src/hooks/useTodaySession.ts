// src/hooks/useTodaySession.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

type DailyPayload = {
  date?: string;
  attendance?: string | { text?: string; present?: number; total?: number };
  focus?: string;
  notes?: string;
  risk?: string;
  avgRating?: number | string | null;
  // backward compat fields
  hadir?: string;
  fokus?: string;
  catatan?: string;
  risiko?: string;
};

type TodayUI = {
  date: string;
  hadir: string;            // utk kode lama
  attendanceText: string;   // utk kode baru
  fokus: string;
  catatan: string;
  risiko: string;
  avgRatingText: string;
};

async function fetchTodaySession(): Promise<TodayUI> {
  const d = (await apiFetch("/sessions/daily")) as DailyPayload;

  const attText =
    typeof d.attendance === "string"
      ? d.attendance
      : d.attendance?.text ?? d.hadir ?? "-";

  const avg =
    typeof d.avgRating === "number"
      ? d.avgRating.toFixed(1)
      : (d.avgRating ?? "-") + "";

  return {
    date: d.date ?? "Today",
    hadir: attText || "-",              // alias lama
    attendanceText: attText || "-",     // alias baru
    fokus: d.focus ?? d.fokus ?? "-",
    catatan: d.notes ?? d.catatan ?? "-",
    risiko: d.risk ?? d.risiko ?? "-",
    avgRatingText: avg,
  };
}

export function useTodaySession() {
  return useQuery({
    queryKey: ["today-session"],
    queryFn: fetchTodaySession,
    staleTime: 30_000,
  });
}
