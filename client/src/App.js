import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatList from "./pages/ChatList";
import Chat from "./pages/Chat";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/chat-list" element={<ChatList />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
