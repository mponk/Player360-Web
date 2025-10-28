import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

interface WeeklyReviewData {
  weekStart: string;
  weekEnd: string;
  topPerformers: Array<{
    name: string;
    number: number;
    avgRating: number;
    note: string;
  }>;
  attendanceSummary: {
    sessionsHeld: number;
    attendanceRate: string;
  };
  riskAlerts: Array<{
    name: string;
    issue: string;
    status: string;
  }>;
  focusNotes: string;
}

export function useWeeklyReview() {
  return useQuery<WeeklyReviewData>({
    queryKey: ["weekly-review"],
    queryFn: async () => {
      const res = await apiFetch("/sessions/weekly-review");
      if (!res.ok) throw new Error("Failed to fetch weekly review");
      return res.json();
    }
  });
}
