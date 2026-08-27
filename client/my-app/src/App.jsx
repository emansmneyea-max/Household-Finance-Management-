import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import {clearToken, getToken } from "./services/api.js";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()));
  const [screen, setScreen] = useState("login");

  function handleLogout() {
  clearToken();
  setIsLoggedIn(false);
  setScreen("login");
}
 
  if (!isLoggedIn) {
    return (
      <div className="app-shell">
        {screen === "register" ? (
          <Register
            onSuccess={() => setIsLoggedIn(true)}
            onGoToLogin={() => setScreen("login")}
          />
        ) : (
          <Login
            onSuccess={() => setIsLoggedIn(true)}
            onGoToRegister={() => setScreen("register")}
          />
        )}
      </div>
    );
  }
    return <Dashboard onLogout={handleLogout} />;
}

export default App;