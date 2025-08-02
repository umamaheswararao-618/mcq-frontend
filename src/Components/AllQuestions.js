import Axios from "axios";
import React from "react";
import './AllQuestions.css';
import axiosurl from "../AxiosPath";

function AllQuestions() {
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(() => {
        axiosurl.get("/AllQuestions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Error fetching questions:", error));
    }, []);

    return (
        <div className="AllQuestions">
           <div className="header">
             <h2>All Questions</h2>
           </div>
        <div className="question-list">
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <h3><pre>{question.questiontext}</pre></h3>
                        <pre>A: {question.optionA}</pre>
                        <pre>B: {question.optionB}</pre>
                        <pre>C: {question.optionC}</pre>
                        <pre>D: {question.optionD}</pre>
                        <pre>Correct Answer: {question.correctAnswer}</pre>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}
export default AllQuestions;