import TopNav from "../components/TopNav";
import { useParentOverview } from "../hooks/useParentOverview";
import { useAuth } from "../context/AuthContext";

export default function ParentOverviewPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useParentOverview();

  if (user?.role !== "parent") {
    return (
      <main className="min-h-screen flex flex-col">
        <TopNav />
        <section className="p-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm">
            Access denied. This page is only for parents.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold">Parent Overview</h1>
          <p className="text-xs text-gray-500">
            Track your child's training progress and coach feedback.
          </p>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-600">Failed to load overview.</div>}

        {data && (
          <>
            <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
              <div className="text-xs font-semibold text-gray-600">Player Info</div>
              <div className="text-lg font-bold">
                #{data.player.number} {data.player.name}
              </div>
              <div className="text-sm text-gray-600">Position: {data.player.position}</div>
            </div>

            <div className="bg-white border rounded-xl shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="text-xs font-semibold">Recent Sessions</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs text-gray-500">
                    <tr>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Attendance</th>
                      <th className="px-3 py-2">Rating</th>
                      <th className="px-3 py-2">Coach Notes</th>
                      <th className="px-3 py-2">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSessions.map((session) => (
                      <tr key={session.sessionId} className="border-t">
                        <td className="px-3 py-2 font-medium">{session.date}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              session.attendanceStatus === "present"
                                ? "bg-green-100 text-green-800"
                                : session.attendanceStatus === "excused"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {session.attendanceStatus}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          {session.rating > 0 ? (
                            <span className="font-medium">{session.rating}/5</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-gray-600">{session.coachNotes}</td>
                        <td className="px-3 py-2">
                          {session.riskFlag ? (
                            <span className="text-xs text-orange-600">{session.riskFlag}</span>
                          ) : (
                            <span className="text-gray-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
