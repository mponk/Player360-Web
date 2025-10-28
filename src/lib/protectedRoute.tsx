import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- ini yang penting

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  // Masih inisialisasi: lagi hydrate dari localStorage.
  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  // Udah selesai init, tapi belum login -> tendang ke /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User valid -> boleh masuk
  return children;
}
