import React from "react";
import './SignIn.css';
import { useState } from "react";

//import { useNavigate } from "react-router-dom";
import axiosurl from "../AxiosPath";
function SignUp(){
    const [payload, setPayload] = useState({
        email: "",
        passWord: "",
        roll: ""
    });
     const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const passwordregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     const [passwordError, setPasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handlePassword = (confirmPassword1) => {
        if (confirmPassword1 !== payload.passWord) {
            alert("Passwords do not match");
            return false;
        }
        else{
            return true;
        }
    }
    const handleEmail = (e) => {
        const value = e.target.value;
       setPayload({ ...payload, email: value });
        if(emailregex.test(value)|| value === "") {
            setemailError(""); 
        }
        else{
            setemailError("❌Email must be valid format (e.g.,abc@gmail.com)");
        }
    }
    const handlePasswordChange = (e) => {
        const value = e.target.value;
         setPayload({ ...payload, passWord: value });   
        if (passwordregex.test(value)|| value === "") {
                setPasswordError("");
               
            } else {
                setPasswordError("❌ Password must be at least 8 chars, 1 uppercase, 1 number, 1 special character");
            }
    }
    const  hadleSubmit =async (e) => {
        e.preventDefault();
        if(handlePassword(confirmPassword)&& emailregex.test(payload.email) && passwordregex.test(payload.passWord)) {
        if (payload.roll === "user" || payload.roll === "admin") {
                try{
                const response=await axiosurl.post(`/Questions/User/SignUp`, payload)
                    .then(response => {
                        if (response.status === 200) {
                            alert(`✅ Sign Up successful ${response.data}`);
                        }
                    })}
                    catch(error)
                    {
                        if (error.response.status===409) {
                            alert("User already exists");
                        }
                        else if (error.response.status===500) {
                            alert("Internal Server Error");
                        }
                        else {
                            alert("An error occurred during Sign Up");
                        }
                    }
            
        } else {
            alert("Please enter a valid role (user/admin)");
        }
       }
       else{
            alert("Please fill in all fields correctly.");
       }
    }
    return (
        <div className="SignIn">
            <form onSubmit={hadleSubmit}>
                <div className="h">
                    <h2>Sign Up</h2>
                </div>
                <div className="input-field">
                    <table>
                        <tr>
                            <td><label htmlFor="email">Email</label></td>
                            <td><input value={payload.email} onChange={handleEmail} type="email" id="email" required /></td> 
                            
                        </tr>
                         {emailError && (
                         <tr>
                             <td>
                                <p style={{ color: "red", margin: 0 }}>{emailError}</p>
                            </td>
                        </tr>)}
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" value={payload.passWord} onChange={handlePasswordChange} id="password" required /></td>                        
                        </tr>
                        {passwordError && ( 
                        <tr>
                            <td>
                                <p style={{ color: "red", margin: 0 }}>{passwordError}</p>
                            </td>
                        </tr>)}
                        <tr>
                            <td><label htmlFor="confirm-password">Confirm Password</label></td>
                            <td><input type="password" id="confirm-password"  onChange={(e)=>setConfirmPassword(e.target.value)}required /> </td>   
                        </tr>
                        {
                            confirmPassword && (
                                <tr>
                                    <td>
                                        {confirmPassword !== payload.passWord ? (
                                            <p style={{ color: "red", margin: 0 }}>❌ Passwords do not match</p>
                                        ) : (
                                            <p style={{ color: "green", margin: 0 }}>✔️ Passwords match</p>
                                        )}
                                    </td>
                                </tr>
                            )
                        }
                       
                        <tr>
                            <td><label htmlFor="Roll">Roll</label> </td>
                            <td><input type="text" id="Roll" value={payload.roll} onChange={
                                (e) => {
                                    setPayload({ ...payload, roll: e.target.value });
                                }
                            } placeholder="Enter user/admin role only" required /></td>
                        </tr>
                      
                    </table>
                    <button type="submit">Sign In</button>
                </div>

            </form>       
        </div>
    );
}
export default SignUp;