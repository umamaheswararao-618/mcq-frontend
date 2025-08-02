//import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axiosurl from "../AxiosPath";
function ViewQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [id, setId] = useState(0);
        const {user} =useAuth();
       useEffect(() => {
    if (user?.id) {
        setId(user.id);
        alert("User ID: " + user.id);
    }
}, [user]);
    useEffect(() => {
        axiosurl.get(`/Questions/viewQuiz/${id}`)
            .then(response => {
                setQuizData(response.data);
            })
            .catch(error => console.error("Error fetching quizzes:", error));
    }, [id]);

    return (
        <div className="ViewQuiz">
            <div className="header">
                <h2>View Quizzes</h2>
            </div>
            <div className="quiz-list">
                <ul>
                    {quizData.map((quiz, index) => (
                        <li key={index}>
                            <h3><pre>{quiz.question.questiontext}</pre></h3>
                            <div>
                                <label><input type="radio" name={`q${index}`} /> {quiz.question.optionA}</label><br />
                                <label><input type="radio" name={`q${index}`} /> {quiz.question.optionB}</label><br />
                                <label><input type="radio" name={`q${index}`} /> {quiz.question.optionC}</label><br />
                                <label><input type="radio" name={`q${index}`} /> {quiz.question.optionD}</label><br />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ViewQuiz;
