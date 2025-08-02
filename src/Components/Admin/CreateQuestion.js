import React from "react";
import './CreateQuestion.css';
import axiosurl from "../../AxiosPath";
function CreateQuestion() {

    const [formdata,setFormData]   = React.useState({
        questiontext: '',   
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        type:''
    });
     
    const handleSubmit =async (e) => {
    e.preventDefault();
    try{
    const response=await axiosurl.post("/create", formdata)
        if (response.status === 200) {
            alert("✅ Question saved successfully");
            setFormData({
                questiontext: '',   
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                correctAnswer: '',
                type:''
            });
        }
    }
      catch(error){
        if (error.response.status === 409) {
            alert("❌ Question already exists");
        } else {
            alert("❌ Error saving question");
        }
      }
  };
    const handleChange = (e) => {
       setFormData({ ...formdata,[e.target.id]: e.target.value});
    };
    return (
    <div className="CreateQuestion">
        <form onSubmit={handleSubmit}>
            <div className="h">
                <h2>Create Question</h2>    
            </div>
            <div className="Question-input-field ">
               {['questiontext','optionA','optionB','optionC','optionD','correctAnswer','type'].map((field) =>(
                <div className="input-group">
                    <label htmlFor="question">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    <textarea id={field} value={formdata[field]} onChange={handleChange} required></textarea>
                </div>
            ))}
            </div>
            <button>Save Question</button>
        </form>
    </div>);
}export default CreateQuestion;