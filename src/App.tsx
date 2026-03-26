import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CitizenProjectList from "./pages/citizen/CitizenProjectList";
import CitizenProjectDetail from "./pages/citizen/CitizenProjectDetail";
import ReportIssue from "./pages/citizen/ReportIssue";
import Leaderboard from "./pages/citizen/Leaderboard";
import SavedProjects from "./pages/citizen/SavedProjects";
import ProfileScreen from "./pages/citizen/ProfileScreen";
import MapView from "./pages/shared/MapView";
import Notifications from "./pages/shared/Notifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjectTable from "./pages/admin/AdminProjectTable";
import AdminProjectDetail from "./pages/admin/AdminProjectDetail";
import AdminComplaints from "./pages/admin/AdminComplaints";
import UserManagement from "./pages/admin/UserManagement";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          {/* Citizen */}
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/citizen/projects" element={<CitizenProjectList />} />
          <Route path="/citizen/project/:id" element={<CitizenProjectDetail />} />
          <Route path="/citizen/report/:projectId" element={<ReportIssue />} />
          <Route path="/citizen/map" element={<MapView role="citizen" />} />
          <Route path="/citizen/leaderboard" element={<Leaderboard />} />
          <Route path="/citizen/notifications" element={<Notifications role="citizen" />} />
          <Route path="/citizen/saved" element={<SavedProjects />} />
          <Route path="/citizen/profile" element={<ProfileScreen />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjectTable />} />
          <Route path="/admin/project/:id" element={<AdminProjectDetail />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/map" element={<MapView role="admin" />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/analytics" element={<ReportsAnalytics />} />
          <Route path="/admin/notifications" element={<Notifications role="admin" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
