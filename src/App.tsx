import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./lib/protectedRoute";
import LoginPage from "./routes/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import AttendancePage from "./routes/AttendancePage";
import PerformancePage from "./routes/PerformancePage";
import RecapPage from "./routes/RecapPage";
import ParentOverviewPage from "./routes/ParentOverviewPage";
import WeeklyReviewPage from "./routes/WeeklyReviewPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/performance"
        element={
          <ProtectedRoute>
            <PerformancePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recap"
        element={
          <ProtectedRoute>
            <RecapPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent"
        element={
          <ProtectedRoute>
            <ParentOverviewPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/weekly"
        element={
          <ProtectedRoute>
            <WeeklyReviewPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
