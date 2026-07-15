import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GymProvider } from "./context/GymContext";
import { ToastProvider } from "./context/ToastContext";
import AppShell from "./components/layout/AppShell";
import SummaryPage from "./pages/SummaryPage";
import MembersPage from "./pages/MembersPage";
import TrainersPage from "./pages/TrainersPage";
import AttendancePage from "./pages/AttendancePage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  return (
    <ToastProvider>
      <GymProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<SummaryPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GymProvider>
    </ToastProvider>
  );
}
