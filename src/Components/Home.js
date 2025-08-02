import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {user?.email}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
