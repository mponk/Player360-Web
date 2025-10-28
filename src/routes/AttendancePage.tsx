import TopNav from "../components/TopNav";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PlayerStatus, useAttendance } from "../hooks/useAttendance";

export default function AttendancePage() {
  const [params] = useSearchParams();
  const sessionId = params.get("sessionId") ?? "today";
  const { data: initialPlayers, isLoading, error, save } = useAttendance(sessionId);
  const [players, setPlayers] = useState(initialPlayers ?? []);

  // keep local editable state in sync
  // when query resolves the first time:
  if (!players.length && initialPlayers && initialPlayers.length) {
    setPlayers(initialPlayers);
  }

  function updateStatus(id: string, newStatus: PlayerStatus) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  }

  async function handleSave() {
    await save.mutateAsync(players);
    alert("Attendance saved.");
  }

  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />

      <section className="p-4 flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold">Attendance — Today</h1>
          <p className="text-xs text-gray-500">Mark each player before saving.</p>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
        {error && <div className="text-sm text-red-600">Failed to load players.</div>}

        <div className="overflow-x-auto border rounded-xl bg-white shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Pos</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{p.number}</td>
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2 text-gray-500">{p.position}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 text-xs">
                      {(["present", "excused", "absent"] as PlayerStatus[]).map((status) => (
                        <label key={status} className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name={`status-${p.id}`}
                            checked={p.status === status}
                            onChange={() => updateStatus(p.id, status)}
                          />
                          <span className="capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
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
          {save.isPending ? "Saving…" : "Save Attendance"}
        </button>
      </section>
    </main>
  );
}
