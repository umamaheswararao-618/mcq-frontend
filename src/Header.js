import React from "react";
import {Link} from "react-router-dom";
import './Header.css';
import { useAuth } from "./Components/AuthContext";
function Header()
 {
    const { user } = useAuth();
    return (
        <div className="header">
           <div className="header-title">
                <h1>MCQ Quiz Application</h1>
            </div>
            <div className="header-links">
            <nav>
                <ul>
                    {!user && (
                        <>
                        <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )
                    }
                    
                </ul>
            </nav>
            </div>
        </div>)
}
export default Header;