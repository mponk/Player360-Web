import TopNav from "../components/TopNav";
import { DashboardCard } from "../components/DashboardCard";
import { useTodaySession } from "../hooks/useTodaySession";

export default function DashboardPage() {
  const { data, isLoading, error } = useTodaySession();

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <h1 className="text-lg font-semibold">
          Today's Training Session — {data?.date ?? ""}
        </h1>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && (
          <div className="text-sm text-red-600">
            Failed to load session. Showing fallback.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <DashboardCard title="Attendance" value={data?.attendance ?? "-"} />
          <DashboardCard title="Focus" value={data?.focus ?? "-"} note="Main theme today" />
          <DashboardCard title="Coach Notes" value={data?.notes ?? "-"} note="To review tomorrow" />
          <DashboardCard title="Injury / Risk" value={data?.risk ?? "-"} note="Monitor recovery" />
        </div>

        <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-3">
          <div className="text-sm font-semibold">Quick Actions</div>
          <div className="flex flex-wrap gap-2">
            <a
              href={`/attendance?sessionId=${data?.sessionId ?? "today"}`}
              className="px-3 py-2 text-xs rounded-lg border bg-white hover:bg-gray-50 font-medium"
            >
              Take Attendance
            </a>
            <a
              href={`/performance?sessionId=${data?.sessionId ?? "today"}`}
              className="px-3 py-2 text-xs rounded-lg border bg-white hover:bg-gray-50 font-medium"
            >
              Rate Players
            </a>
            <a
              href={`/recap?sessionId=${data?.sessionId ?? "today"}`}
              className="px-3 py-2 text-xs rounded-lg border bg-white hover:bg-gray-50 font-medium"
            >
              View Recap
            </a>
            <a
              href="/weekly"
              className="px-3 py-2 text-xs rounded-lg border bg-white hover:bg-gray-50 font-medium"
            >
              Weekly Review
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
