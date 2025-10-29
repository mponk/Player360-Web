import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  // Pas app baru kebangun, kita lagi sync token dari localStorage.
  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  // Kalo udah nggak loading tapi masih ga ada user -> tendang balik login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User valid -> boleh liat halaman yang dilindungi
  return children;
}
