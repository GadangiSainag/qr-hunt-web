import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import LostPage from "./Pages/NotFound/LostPage";
import Login from "./Pages/Admin/Login";
import RegisterTeam from "./Pages/Admin/RegisterTeam";
import TeamLogin from "./Pages/Team/Login";
import GetReady from "./Pages/Game/GetReady";
import Dashboard from "./Pages/Admin/Dashboard";
import MainPage from "./Pages/Game/MainPage";
import axios from "axios";
import {
  responseInterceptor,
  errorInterceptor,
} from "./interceptors/response.interceptor";
import ProtectedRoute from "./Components/ProtectedRoute";
import AuthContextProvider from "./context/AuthProvider";
import QuestionsTab from "./Pages/Admin/QuestionsTab";
import AdminDataProvider from "./context/AdminProvider";
import PlayerDataProvider from "./context/PlayerProvider";
import TeamsTab from "./Pages/Admin/TeamsTab";
import { ThemeProvider } from "./Components/theme-provider";
import TeamStatus from "./Pages/Admin/TeamStatus";
import { Leaderboard } from "./Pages/Leaderboard/Leaderboard";
import { GlobalLeaderboard } from "./Pages/Leaderboard/Global";
import Layout from "./Pages/Admin/Layout";

function App() {
  axios.interceptors.response.use(responseInterceptor, errorInterceptor);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />

            <Route path="/instructions" element={<Home />} />

            <Route path="/admin/login" element={<Login />} />

            <Route path="/team/login" element={<TeamLogin />} />

            <Route path="/404" element={<LostPage />} />

            <Route path="/leaderboard/global" element={<GlobalLeaderboard />} />
            <Route path="/leaderboard/:batchId" element={<Leaderboard />} />

            <Route
              element={
                <AdminDataProvider>
                  <ProtectedRoute allowedRoles={["admin"]} />
                </AdminDataProvider>
              }
            >
              {/* Protected routes for only admin */}
              <Route path="/admin" element={<Layout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/teams" element={<TeamsTab />} />
                <Route path="/admin/questions" element={<QuestionsTab />} />
                <Route path="/admin/register-team" element={<RegisterTeam />} />
                <Route
                  path="/admin/team-satus/:teamId"
                  element={<TeamStatus />}
                />
              </Route>
            </Route>

            <Route
              element={
                <PlayerDataProvider>
                  <ProtectedRoute allowedRoles={["player"]} />
                </PlayerDataProvider>
              }
            >
              {/* Protected routes for players only */}
              <Route path="/game/ready" element={<GetReady />} />
              <Route path="/game/play" element={<MainPage />} />
            </Route>

            <Route path="/*" element={<LostPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
