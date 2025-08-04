import react, { useState } from "react";
import './Login.css';

import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axiosurl from "../AxiosPath";
function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [role,setRole]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
     const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const passwordregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     const [passwordError, setPasswordError] = useState("");
     const [emailError, setemailError] = useState("");
     const {login}= useAuth();
     const handleEmail = (e) => { 
        const value = e.target.value;
        setEmail(value);
        if(emailregex.test(value)|| value === "") {
            setemailError("");
        }
        else{
            setemailError("❌Email must be valid format (e.g.,abc@gmail.com)");
        }
    }
        const handlePasswordChange = (e) => {
            const value = e.target.value;
            setPassword(value);
            if (passwordregex.test(value)|| value === "") {
                setPasswordError("");
            } else {
                setPasswordError("❌ Password must be at least 8 chars, 1 uppercase, 1 number, 1 special character");
            }
        }
     const handlesubmit=async (e)=>{
        e.preventDefault();
        if(role==="user" || role==="admin"){
            
             const roll= role;
            try{
            const response = await axiosurl.post("/Questions/User/LogIn", {
                email,
                password,
               roll
            })
        if (response.status === 200) {
                if (true) {
                    const id=parseInt(response.data);
                    setMessage("✅ Login successful");
                    login({ email, roll,id });
                    alert(message);
                    navigate("/home");
                    
                } 
            }
            alert(message);
        }
            catch(error){
                 if (error.response) {
                if (error.response.status === 404) {
                    setMessage("❌ User not found");
                } else if (error.response.status === 401) {
                    setMessage("❌ Invalid credentials");
                }
                else if (error.response && error.response.status === 409) {
                    setMessage("❌ Need Access As admin");
                }
                 else {
                    setMessage("❌ Something went wrong");
                }
            } else {
                setMessage("❌ Network error");
            }
            alert(message);
            }
        }}
    return (
        <div className="Login">
            <form onSubmit={handlesubmit}>
                <div className="h">
                    <h2>Login</h2>      
                </div>
                <div className="Login-input-field">
                    <table>
                        <tr>
                            <td><label htmlFor="Role">Username</label></td> 
                            <td>
                                <select id="Role" value={role} onChange={(e)=>setRole(e.target.value)} required>
                                    <option value="">Select Role</option>
                                    <option value="user"  >User</option>
                                    <option value="admin" >Admin</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">Email</label></td>
                            <td><input type="email" id="email" value={email} onChange={handleEmail} required /></td> 
                        </tr>
                        {emailError && (
                            <tr>
                                <td colSpan="2" className="error">{emailError}</td>
                            </tr>
                        )}
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" value={password} onChange={handlePasswordChange} id="password" required /></td>    
                        </tr>
                        {passwordError && (
                            <tr>
                                <td colSpan="2" className="error">{passwordError}</td>
                            </tr>
                        )}
                    </table>
                    <button type="submit">Login</button> 
                </div>   
         </form>
            
    </div>
    );
}
export default Login;