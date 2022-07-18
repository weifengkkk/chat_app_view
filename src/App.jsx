import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import "./index.css";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import Contacts from "./components/Contacts";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Chat></Chat>}></Route>
        <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
        <Route path="/contacts" element={<Contacts></Contacts>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
