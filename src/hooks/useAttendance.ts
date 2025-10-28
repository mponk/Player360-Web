// src/hooks/useAttendance.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export type PlayerStatus = "present" | "excused" | "absent";

export type PlayerItem = {
  id: string;
  number: number;
  name: string;
  position: string;
  status: PlayerStatus;
};

async function fetchPlayers(sessionId: string): Promise<PlayerItem[]> {
  try {
    // expected backend: GET /sessions/{sessionId}/players (or /attendance)
    const data = await apiFetch(`/sessions/${sessionId}/players`, {
      method: "GET",
    });

    // normalize to PlayerItem[]
    return (data.players ?? data ?? []).map((p: any) => ({
      id: String(p.id ?? p._id ?? crypto.randomUUID()),
      number: Number(p.number ?? 0),
      name: String(p.name ?? ""),
      position: String(p.position ?? p.pos ?? ""),
      status: (p.status as PlayerStatus) ?? "present",
    }));
  } catch {
    // fallback mock
    return [
      { id: "p1", number: 7, name: "Asep", position: "FW", status: "present" },
      { id: "p2", number: 10, name: "Bimo", position: "MF", status: "excused" },
      { id: "p3", number: 4, name: "Rafi", position: "DF", status: "present" },
    ];
  }
}

async function saveAttendance(sessionId: string, players: PlayerItem[]) {
  // expected backend: POST /sessions/{sessionId}/attendance
  return apiFetch(`/sessions/${sessionId}/attendance`, {
    method: "POST",
    body: JSON.stringify({
      attendance: players.map((p) => ({
        id: p.id,
        status: p.status,
      })),
    }),
  });
}

export function useAttendance(sessionId: string) {
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["attendance", sessionId],
    queryFn: () => fetchPlayers(sessionId),
  });

  const save = useMutation({
    mutationFn: (players: PlayerItem[]) => saveAttendance(sessionId, players),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["attendance", sessionId] }),
  });

  return { ...list, save };
}
