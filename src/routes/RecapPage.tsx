import TopNav from "../components/TopNav";
import { useSearchParams } from "react-router-dom";
import { useRecap } from "../hooks/useRecap";

export default function RecapPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId") ?? "today";
  
  const { data: recap, isLoading, error } = useRecap(sessionId);

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold">
            Daily Recap — {recap?.date ?? "Loading..."}
          </h1>
          <p className="text-xs text-gray-500">
            Summary of team performance and coach notes.
          </p>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-600">Failed to load recap.</div>}

        {recap && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="text-xs font-semibold text-green-700">
                  Top Performers
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {recap.highlight.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="text-xs font-semibold text-orange-700">
                  Needs Attention
                </div>
                <ul className="text-sm list-disc list-inside space-y-1">
                  {recap.concern.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
              <div className="text-xs font-semibold">Overall Notes</div>
              <p className="text-sm leading-relaxed">{recap.notes}</p>
            </div>

            {recap.detailedRisk && recap.detailedRisk.length > 0 && (
              <div className="bg-white border rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="text-xs font-semibold text-red-700">
                  Injury / Risk Watch
                </div>
                <div className="space-y-2">
                  {recap.detailedRisk.map((risk, i) => (
                    <div key={i} className="text-sm border-l-2 border-red-300 pl-3 py-1">
                      <div className="font-medium">{risk.name}</div>
                      <div className="text-gray-600 text-xs">
                        {risk.issue} — {risk.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
