import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

interface ParentOverviewData {
  player: {
    id: string;
    number: number;
    name: string;
    position: string;
  };
  recentSessions: Array<{
    sessionId: string;
    date: string;
    attendanceStatus: string;
    rating: number;
    coachNotes: string;
    riskFlag: string;
  }>;
}

export function useParentOverview() {
  return useQuery<ParentOverviewData>({
    queryKey: ["parent-overview"],
    queryFn: async () => {
      const res = await apiFetch("/parent/overview");
      if (!res.ok) throw new Error("Failed to fetch parent overview");
      return res.json();
    }
  });
}
