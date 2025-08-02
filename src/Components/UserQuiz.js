import React, { useState, useEffect } from "react";
import './UserQuiz.css';
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axiosurl from "../AxiosPath";

function UserQuiz() {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [id, setId] = useState(0);
    const { user } = useAuth();
    const location = useLocation();
    const [score, setScore] = useState(0);
    const [type, setType] = useState("");

    useEffect(() => {
        if (user?.id) {
            setId(user.id);
        }
    }, [user]);

    useEffect(() => {
        if (location.state?.language) {
            setType(location.state.language);
        }
    }, [location.state]);

    useEffect(() => {
        if (type) {
            axiosurl.get(`/Questions/User/userquiz/${type}`)
                .then(response => {
                    console.log("Received Data:", response.data);
                    setQuizData(response.data);
                })
                .catch(error => console.error("Error fetching quizzes:", error));
        }
    }, [type]);

    const handleChange = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const fetchScore = async (payload) => {
        try {
            const response = await axiosurl.post(`/Questions/Result/${id}/${type}`, payload);
            setScore(response.data);
            alert(`Your ${type} Test Score: ${response.data}/100`);
        } catch (error) {
            alert(`Error fetching score: ${error}`);
        }
    };

    const handleQuiz = async (e) => {
        e.preventDefault();

        if (!id || !type) {
            alert("User ID or quiz type missing!");
            return;
        }

        const payload = quizData.map((quiz) => ({
            user: { id: id },
            question: { id: quiz.id },
            marked: answers[quiz.id],
            date: new Date().toISOString().slice(0, 10),
            type: type
        }));

        try {
            await axiosurl.post(`/Questions/User/SubmitQuiz`, payload);
            alert(`Quiz submitted successfully!`);
            fetchScore(payload);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
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
                                    <h3><pre>{index + 1} {quiz.questiontext}</pre></h3>
                                </div>
                                <div className="options">
                                    {[quiz.optionA, quiz.optionB, quiz.optionC, quiz.optionD].map((option, i) => (
                                        <label className="flex-label" key={i}>
                                            <input type="radio" name={quiz.id} onChange={() => handleChange(quiz.id, option)} />
                                            <pre>{option}</pre>
                                        </label>
                                    ))}
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
