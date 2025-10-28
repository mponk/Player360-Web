import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

interface RecapData {
  sessionId: string;
  date: string;
  highlight: string[];
  concern: string[];
  notes: string;
  detailedRisk: Array<{
    playerId: string;
    name: string;
    issue: string;
    status: string;
  }>;
}

export function useRecap(sessionId: string) {
  return useQuery<RecapData>({
    queryKey: ["recap", sessionId],
    queryFn: async () => {
      const res = await apiFetch(`/sessions/${sessionId}/recap`);
      if (!res.ok) throw new Error("Failed to fetch recap");
      return res.json();
    }
  });
}
