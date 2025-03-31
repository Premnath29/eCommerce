import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/loginPage.js";
import Products from "./pages/cartPage.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
console.log("isAuthenticated",isAuthenticated);

  const handleLogin = (username, password) => {debugger
    if (username === "admin" && password === "admin@123") {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/products" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
