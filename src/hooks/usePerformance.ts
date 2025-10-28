// src/hooks/usePerformance.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export type PerfItem = {
  id: string;
  number: number;
  name: string;
  rating: number; // 1..5
  notes: string;
};

async function fetchPerformance(sessionId: string): Promise<PerfItem[]> {
  try {
    // expected backend: GET /sessions/{sessionId}/performance
    const data = await apiFetch(`/sessions/${sessionId}/performance`, {
      method: "GET",
    });

    return (data.players ?? data ?? []).map((p: any) => ({
      id: String(p.id ?? p._id ?? crypto.randomUUID()),
      number: Number(p.number ?? 0),
      name: String(p.name ?? ""),
      rating: Number(p.rating ?? 0),
      notes: String(p.notes ?? ""),
    }));
  } catch {
    // fallback mock
    return [
      {
        id: "p1",
        number: 7,
        name: "Asep",
        rating: 4,
        notes: "Strong finishing, high work rate",
      },
      {
        id: "p2",
        number: 10,
        name: "Bimo",
        rating: 3,
        notes: "Needs more aggressive pressing",
      },
    ];
  }
}

async function savePerformance(sessionId: string, rows: PerfItem[]) {
  // expected backend: POST /sessions/{sessionId}/performance
  return apiFetch(`/sessions/${sessionId}/performance`, {
    method: "POST",
    body: JSON.stringify({
      ratings: rows.map((r) => ({
        id: r.id,
        rating: r.rating,
        notes: r.notes,
      })),
    }),
  });
}

export function usePerformance(sessionId: string) {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["performance", sessionId],
    queryFn: () => fetchPerformance(sessionId),
  });

  const save = useMutation({
    mutationFn: (rows: PerfItem[]) => savePerformance(sessionId, rows),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["performance", sessionId] }),
  });

  return { ...list, save };
}
