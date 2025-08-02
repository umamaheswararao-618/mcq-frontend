import React,{useState} from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function ProtectRoute({ children }) {
  const { isAuthenticated,setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
     return <Navigate to="/login" replace />;
  }
  return children; 
};
export default ProtectRoute;