import { useState } from "react";
import axiosurl from "../AxiosPath";
import { useAuth } from "./AuthContext";

function Result() {
  const [scores, setScores] = useState({}); // Store scores for each language
  const { user } = useAuth();

  const fetchScore = async (lan) => {
    try {
      const response = await axiosurl.get(`/Questions/subjectresults/${user?.id}/${lan}`);
      setScores((prev) => ({ ...prev, [lan]: response.data })); // update score for that language
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Result">
      <h1>Results</h1>
      {["java", "javascript", "python"].map((language, index) => (
        <div className="Button" key={index}>
          <button onClick={() => fetchScore(language)}>{language}</button>

          {scores[language] !== undefined && (
            <div className="Score">
              <h3>Score: {scores[language]}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Result;
