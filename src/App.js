import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import HomeUser from "./pages/HomeUser";
import Eventos from "./pages/Eventos";
import Trabalhos from "./pages/Trabalho";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/register"
            element={<PublicRoute element={<Register />} />}
          />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/eventos" element={<ProtectedRoute element={<Eventos />} />} />
          <Route path="/trabalhos" element={<ProtectedRoute element={<Trabalhos />} />} />
          <Route
            path="/home"
            element={<PublicRoute element={<HomeUser />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
