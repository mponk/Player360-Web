import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // data = { token, user: { id, name, role } }
    login(data.token, data.user);

    // setelah nyimpen ke localStorage, pindah ke dashboard
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border rounded-xl shadow p-6 flex flex-col gap-4"
      >
        <h1 className="text-lg font-semibold text-center">Coach Login</h1>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Email</label>
          <input
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-600">Password</label>
          <input
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-black text-white text-sm font-medium rounded-lg py-2 hover:bg-black/90"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
