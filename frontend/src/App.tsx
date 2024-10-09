import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import LostPage from "./Pages/NotFound/LostPage";
import Login from "./Pages/Admin/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/404" element={<LostPage />} />
          <Route path="/admin/login" element={<Login />} />

          {/* <Route path="/en/:id" element={} /> */}
          
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;