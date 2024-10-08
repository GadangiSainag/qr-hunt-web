import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/en/:id" element={} /> */}
          
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;