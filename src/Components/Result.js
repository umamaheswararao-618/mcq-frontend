import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import axiosurl from "../AxiosPath";
import { useAuth } from "./AuthContext";
  function Result(){
    const [language,setLanguage]=useState("javascript");
    const [score,setScore]=useState();
    const [id,setId]=useState(9);
    const {user} = useAuth();
    const location=useLocation();
    /*useEffect(
        ()=>{
            setLanguage(location.state.language);
            setId(user.id);
        },[location.language]
    )*/
   
    useEffect(() => {
        
        fetch();
    }, [language]);
    return (
        <div className="Result">
            <div className="h2">
                <h2>{language}</h2>
            </div>
            <div className="Score">
                <h3>{score}</h3>
            </div>
        </div>
    )
}export default Result;