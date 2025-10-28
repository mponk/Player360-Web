import TopNav from "../components/TopNav";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PerfItem, usePerformance } from "../hooks/usePerformance";

export default function PerformancePage() {
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId") ?? "today";
  const { data: initialRows, isLoading, error, save } = usePerformance(sessionId);
  const [rows, setRows] = useState<PerfItem[]>(initialRows ?? []);

  if (!rows.length && initialRows && initialRows.length) {
    setRows(initialRows);
  }

  function updateRow(id: string, field: "rating" | "notes", value: number | string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  async function handleSave() {
    await save.mutateAsync(rows);
    alert("Performance saved.");
  }

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold">Player Ratings — Today</h1>
          <p className="text-xs text-gray-500">Give each player a 1–5 rating and short notes.</p>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-600">Failed to load performance data.</div>}

        <div className="overflow-x-auto border rounded-xl bg-white shadow">
          <table className="w-full text-sm align-top">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Rating</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{p.number}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">
                    <select
                      className="border rounded-lg px-2 py-1 text-xs"
                      value={p.rating}
                      onChange={(e) => updateRow(p.id, "rating", Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <textarea
                      className="border rounded-lg p-2 w-full text-xs min-w-[200px] min-h-[60px]"
                      value={p.notes}
                      onChange={(e) => updateRow(p.id, "notes", e.target.value)}
                      placeholder="Technical / mental / physical notes…"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleSave}
          disabled={save.isPending}
          className="self-start bg-black text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-black/90 disabled:opacity-60"
        >
          {save.isPending ? "Saving…" : "Save Ratings"}
        </button>
      </section>
    </main>
  );
}
