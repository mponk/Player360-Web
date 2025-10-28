import { useAuth } from "../context/AuthContext";

export default function TopNav() {
  const { user, logout } = useAuth();

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="w-full border-b bg-white flex items-center justify-between px-4 py-3">
      <div className="font-semibold text-sm">
        <div>Player360 Coach Panel</div>
        <div className="text-xs text-gray-500">{today}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium">{user?.name ?? "Coach"}</div>
          <div className="text-[11px] text-gray-500">{user?.role ?? "-"}</div>
        </div>

        <button
          className="text-xs border rounded px-2 py-1 hover:bg-gray-50"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
