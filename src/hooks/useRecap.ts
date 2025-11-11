// src/hooks/useRecap.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export interface RecapData {
  sessionId: string;
  date: string;
  attendance?: { present?: number[]; absent?: number[] };
  ratings?: { number: number; rating: number; notes?: string }[];
  highlight?: string[];
  concern?: string[];
  notes?: string;
}

export function useRecap(sessionId: string) {
  return useQuery<RecapData>({
    queryKey: ["recap", sessionId],
    queryFn: async () => {
      // apiFetch sudah BALIK JSON — jangan diperlakukan seperti Response
      const json = (await apiFetch(`/sessions/${sessionId}/recap`)) as RecapData;

      // normalisasi ringan biar aman
      return {
        sessionId: json.sessionId,
        date: json.date,
        attendance: {
          present: json.attendance?.present ?? [],
          absent: json.attendance?.absent ?? [],
        },
        ratings: json.ratings ?? [],
        highlight: json.highlight ?? [],
        concern: json.concern ?? [],
        notes: json.notes ?? "-",
      };
    },
  });
}
