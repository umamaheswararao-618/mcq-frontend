import React from "react";
import { useNavigate } from "react-router-dom";
function TypesofQuiz() {
    const navigate = useNavigate();
    return(
        <div className="TypesofQuiz">
            <div className="header">
                <h2>Types of Quiz</h2>
            </div>
            <div className="quiz-types">
                <div className="quiz-type">
                    <h3>Java Quiz</h3>
                    <p>Test your knowledge of Java programming with our comprehensive quiz.</p>
                    <button onClick={()=>navigate("/user-quiz", { state: { language: "java" } })}>Take Quiz</button>
                </div>
                <div className="quiz-type">
                    <h3>JavaScript Quiz</h3>
                    <p>Challenge yourself with our JavaScript quiz covering various topics.</p>
                    <button onClick={()=>navigate("/user-quiz", { state: { language: "javascript" } })}>Take Quiz</button>
                
                 </div>
                <div className="quiz-type">
                    <h3>Python Quiz</h3>
                    <p>Assess your Python skills with our interactive quiz.</p>
                    <button onClick={()=>navigate("/user-quiz", { state: { language: "python" } })}>Take Quiz</button>
                </div>

        </div>
        </div>
    );
} export default TypesofQuiz;