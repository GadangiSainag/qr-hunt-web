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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/404" element={<LostPage />} />

          <Route path="/home" element={<Home />} />
          <Route path="/instructions" element={<Home />} /> 

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/register-team" element={<RegisterTeam />} />

          <Route path="/team/login" element={<TeamLogin />} />
          
          <Route path="/game/ready" element={<GetReady />} /> 

          <Route path="/test/scanner" element={<QrScanner />} />

          {/* <Route path="/en/:id" element={} /> */}
          
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;