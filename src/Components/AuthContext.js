import React,{useState,createContext, useContext} from "react";

 const AuthContext=createContext();

 export const AuthProvider=({children})=>{
    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
    const [isAuthenticated,setIsAuthenticated]=useState(()=>{
        return !!localStorage.getItem("user");
    });

    const login=(userData)=>{
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout=()=>{
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth=()=>useContext(AuthContext);