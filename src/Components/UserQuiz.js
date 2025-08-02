//import axios from "axios";
import React, { useState, useEffect } from "react";
import './UserQuiz.css';
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import axiosurl from "../AxiosPath";
import { useNavigate } from "react-router-dom";
function UserQuiz() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [id, setId] = useState(0);
    const {user} =useAuth();
    const location = useLocation();
    const [score,setScore]=useState(0);
    const [type,setType]=useState("");// Default to "java" if no state is provided
    useEffect(() => {
        if(user?.id) {
            setId(user.id);
            
        }
    }, [user]);
    useEffect(() => {
        if (!!location.state.language) {
            setType(location.state.language);
        }   
    } , [location.state]);

    

    useEffect(() => {
        axiosurl.get(`/Questions/User/userquiz/${type}`)
            .then(response => {
                console.log("Received Data:", response.data);
                setQuizData(response.data);
            })
            .catch(error => console.error("Error fetching quizzes:", error));
    }, [type]);

    const handleChange = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };
const  fetch=async(payload)=>{
        try{
        const response= await axiosurl.post(`/Questions/Result/${id}/${type}`,payload)
        setScore(response.data)
        alert(`Your  ${type} Test Score Out Off ${score}/100`)
        }
        catch(error)
        {
            alert(`${error}`)
        }
        
    }
   function result() {
  navigate("/result", {
    state: { language: type, score: score }
  });
}

    const handleQuiz = (e) => {
        e.preventDefault();

        const payload = quizData.map((quiz) => ({
            user: { id: id },
            question: { id: quiz.id },
            marked: answers[quiz.id],
            date: new Date().toISOString().slice(0, 10),
            type: type
        }));

        axiosurl.post(`/Questions/User/SubmitQuiz`, payload)
            .then(response => {
                alert("Quiz submitted successfully!");
              fetch(payload);
            })
            .catch(error => console.error("Error submitting quiz:", error));
            
            /*quizData.map((quiz)=>{
                if(quiz.correctanswer===answers[quiz.id])
                    setScore(score+1);
            })
            result();*/
            
    };

    return (
        <div className="UserQuiz">
            <form onSubmit={handleQuiz}>
                <div className="header">
                    <h2>Available Quizzes</h2>
                </div>
                <div className="quiz-list">
                    <ul>
                        {quizData.map((quiz, index) => (
                            <li key={quiz.id}>
                                <div className="question">
                                    <h3><pre>{index+1} {quiz.questiontext}</pre></h3> {/* ✅ FIXED */}
                                </div>
                                <div className="options">
                                    <label className="flex-label">
                                        <input type="radio" name={quiz.id} onChange={() => handleChange(quiz.id, quiz.optionA)} />
                                        <pre>{quiz.optionA}</pre>
                                    </label>
                                    <label className="flex-label">
                                        <input type="radio" name={quiz.id} onChange={() => handleChange(quiz.id, quiz.optionB)} />
                                        <pre>{quiz.optionB}</pre>
                                    </label>
                                    <label className="flex-label">
                                        <input type="radio" name={quiz.id} onChange={() => handleChange(quiz.id, quiz.optionC)} />
                                        <pre>{quiz.optionC}</pre>
                                    </label>
                                    <label className="flex-label">
                                        <input type="radio" name={quiz.id} onChange={() => handleChange(quiz.id, quiz.optionD)} />
                                        <pre>{quiz.optionD}</pre>
                                    </label>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
}

export default UserQuiz;
