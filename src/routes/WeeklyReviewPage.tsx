import TopNav from "../components/TopNav";
import { useWeeklyReview } from "../hooks/useWeeklyReview";

export default function WeeklyReviewPage() {
  const { data, isLoading, error } = useWeeklyReview();

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold">Weekly Team Review</h1>
          {data && (
            <p className="text-xs text-gray-500">
              {data.weekStart} to {data.weekEnd}
            </p>
          )}
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-600">Failed to load weekly review.</div>}

        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-3">
                <div className="text-xs font-semibold text-indigo-700">Top Performers</div>
                <div className="space-y-2">
                  {data.topPerformers.map((performer, i) => (
                    <div key={i} className="flex justify-between items-start border-b pb-2 last:border-0">
                      <div>
                        <div className="font-medium text-sm">
                          #{performer.number} {performer.name}
                        </div>
                        <div className="text-xs text-gray-600">{performer.note}</div>
                      </div>
                      <div className="text-sm font-bold text-indigo-600">
                        {performer.avgRating.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-3">
                <div className="text-xs font-semibold text-green-700">Attendance Summary</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sessions Held:</span>
                    <span className="font-medium">{data.attendanceSummary.sessionsHeld}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Attendance Rate:</span>
                    <span className="font-medium text-green-600">
                      {data.attendanceSummary.attendanceRate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {data.riskAlerts && data.riskAlerts.length > 0 && (
              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-3">
                <div className="text-xs font-semibold text-orange-700">Risk Alerts</div>
                <div className="space-y-2">
                  {data.riskAlerts.map((alert, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <div className="font-medium text-sm">{alert.name}</div>
                        <div className="text-xs text-gray-600">{alert.issue}</div>
                      </div>
                      <div className="text-xs text-orange-600 font-medium">{alert.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
              <div className="text-xs font-semibold">This Week's Focus</div>
              <p className="text-sm leading-relaxed">{data.focusNotes}</p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
