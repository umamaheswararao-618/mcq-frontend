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
        if(id!==0)
            views(id);
       
    }
}, [user,id]);
const views=async(useri)=>{
    try{
  const response=  await axiosurl.get(`/Questions/viewQuiz/${useri}`)
  setQuizData(response.data);

    }
    catch(error){ alert("Error fetching quizzes:", error);}
}
    

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
                                <label><input type="radio" checked={quiz.marked === quiz.question.optionA} readOnly name={`q${index}`} /> {quiz.question.optionA}</label><br />
                                <label><input type="radio" checked={quiz.marked === quiz.question.optionB} readOnly name={`q${index}`} /> {quiz.question.optionB}</label><br />
                                <label><input type="radio" checked={quiz.marked === quiz.question.optionC} readOnly name={`q${index}`} /> {quiz.question.optionC}</label><br />
                                <label><input type="radio" checked={quiz.marked === quiz.question.optionD} readOnly name={`q${index}`} /> {quiz.question.optionD}</label><br />
                                <label>Correct Answer :{quiz.question.correctAnswer}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ViewQuiz;
