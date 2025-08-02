import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Sidebar.css";
function Sidebar() {
    const { user } = useAuth();

    return (
        <div className="d-flex flex-column p-3 bg-light" >
            <h2 className="text-center mb-4">Sidebar</h2>
            <aside>
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/quiz" className="nav-link">Quiz</Link>
                    </li>

                    {user?.roll === "admin" && (
                        <>
                            <li>
                                <Link to="/create-question" className="nav-link">Create Question</Link>
                            </li>
                            <li>
                                <Link to="/all-questions" className="nav-link">All Questions</Link>
                            </li>
                        </>
                    )}

                    <li>
                        <Link to="/types-of-quiz" className="nav-link">User Quiz</Link>
                    </li>
                    <li>
                        <Link to="/view-quiz" className="nav-link">View Quiz</Link>
                    </li>
                    <li>
                        <Link to="/result" className="nav-link">Result</Link>
                    </li>
                </ul>
            </aside>
        </div>
    );
}

export default Sidebar;
