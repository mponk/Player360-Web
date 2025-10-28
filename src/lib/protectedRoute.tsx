import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  // Masih loading state awal (lagi hydrate dari localStorage)
  if (loading) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading...</div>;
  }

  // Udah selesai loading tapi gak ada user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Udah login
  return children;
}
