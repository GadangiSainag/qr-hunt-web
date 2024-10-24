import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import LostPage from "./Pages/NotFound/LostPage";
import Login from "./Pages/Admin/Login";
import QrScanner from "./Pages/Scanner/QrScanner";
import RegisterTeam from "./Pages/Admin/RegisterTeam";
import TeamLogin from "./Pages/Team/Login";
import GetReady from "./Pages/Game/GetReady";
import Dashboard from "./Pages/Admin/Dashboard";
import MainPage from "./Pages/Game/MainPage";
import axios from "axios";
// import requestInterceptor from './interceptors/request.interceptor';
import {
  responseInterceptor,
  errorInterceptor,
} from "./interceptors/response.interceptor";
import ProtectedRoute from "./Components/ProtectedRoute";
// import ListAllQuestions from "./Components/ListAllQuestions";
import Info from "./Pages/Game/Info";
import AuthContextProvider from "./context/AuthContextprovider";
import QuestionsTab from "./Pages/Admin/QuestionsTab";

function App() {
  // axios.interceptors.request.use(requestInterceptor);
  // Adding interceptors to axios
  axios.interceptors.response.use(responseInterceptor, errorInterceptor);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />

          <Route path="/information" element={<Info />} />

          <Route path="/instructions" element={<Home />} />

          <Route path="/admin/login" element={<Login />} />

          <Route path="/test/scanner" element={<QrScanner />} />

          <Route path="/team/login" element={<TeamLogin />} />

          <Route path="/404" element={<LostPage />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            {/* Protected routes for only admin */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/questions" element={<QuestionsTab />} />
            <Route path="/admin/register-team" element={<RegisterTeam />} />
          </Route>
          

          <Route element={<ProtectedRoute allowedRoles={["player"]} />}>
            {/* Protected routes for players only */}
            <Route path="/game/ready" element={<GetReady />} />
            <Route path="/game/play" element={<MainPage />} />
          </Route>

          <Route path="/*" element={<LostPage /> } />

          {/* <Route path="/en/:id" element={} /> */}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
