// player360-frontend/src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import DashboardPage from "./routes/DashboardPage";
import AttendancePage from "./routes/AttendancePage";
import PerformancePage from "./routes/PerformancePage";
import RecapPage from "./routes/RecapPage";
import WeeklyReviewPage from "./routes/WeeklyReviewPage";
import ParentOverviewPage from "./routes/ParentOverviewPage";
import ProtectedRoute from "./lib/protectedRoute";

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<LoginPage />} />

      {/* coach dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* attendance screen */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendancePage />
          </ProtectedRoute>
        }
      />

      {/* performance rating screen */}
      <Route
        path="/performance"
        element={
          <ProtectedRoute>
            <PerformancePage />
          </ProtectedRoute>
        }
      />

      {/* training recap screen */}
      <Route
        path="/recap"
        element={
          <ProtectedRoute>
            <RecapPage />
          </ProtectedRoute>
        }
      />

      {/* weekly analytics screen */}
      <Route
        path="/weekly"
        element={
          <ProtectedRoute>
            <WeeklyReviewPage />
          </ProtectedRoute>
        }
      />

      {/* parent portal */}
      <Route
        path="/parent"
        element={
          <ProtectedRoute>
            <ParentOverviewPage />
          </ProtectedRoute>
        }
      />

      {/* catch-all: redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
