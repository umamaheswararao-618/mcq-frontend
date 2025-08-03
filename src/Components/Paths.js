import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectRoute from "./ProtectRoute";
import Home from "./Home";
import CreateQuestion from "./Admin/CreateQuestion";
import AllQuestions from "./AllQuestions";
import UserQuiz from "./UserQuiz";
import ViewQuiz from "./ViewQuiz";
import Login from "./Login";
import SignUp from "./SignUp";
import { useAuth } from "./AuthContext";
import TypesofQuiz from "./TypesofQuiz";
import Welcome from "./Welcome";
import Result from "./Result";

function Paths()
{
 const {user}= useAuth();
    return (
        
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {user?.roll==="admin"&&(
                    <>
                    <Route path="/create-question" element={
                    <ProtectRoute>
                        <CreateQuestion />
                    </ProtectRoute>
                } />
                <Route path="/all-questions" element={
                    <ProtectRoute>
                        <AllQuestions />
                    </ProtectRoute>
                } />
                </>)
               }
                <Route path="/view-quiz" element={
                    <ProtectRoute>
                        <ViewQuiz />
                    </ProtectRoute>
                } />
                <Route path="/user-quiz" element={
                    <ProtectRoute>
                        <UserQuiz />
                    </ProtectRoute>
                } />
                <Route path="/types-of-quiz" element={
                    <ProtectRoute>
                        <TypesofQuiz />
                    </ProtectRoute>
                } />
                <Route path="/user-quiz"element={
                    <ProtectRoute>
                        <UserQuiz />
                    </ProtectRoute>
                } />
                 <Route path="/result"element={
                    <ProtectRoute>
                        <Result/>
                    </ProtectRoute>
                } />
                <Route path="/home" element={
                    <ProtectRoute>
                        <Home />
                    </ProtectRoute>
                } />
                <Route path="/tech" element={
                    <ProtectRoute>
                        <Tech />
                    </ProtectRoute>
                } />

            </Routes>
        
    );

  
};
export default Paths;