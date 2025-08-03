import { useEffect, useState } from "react";
import axiosurl from "../AxiosPath"


const Acceptance = async (userId) => {
    try {
        const response = await axiosurl.put(`/Questions/User/Accept/${userId}`
        );
        alert(response.data); 
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user");
    }
};
const users=async()=>{
    try{
        const response=await axiosurl.get(`/Tech`);
        setTechData(response.data);
    }
    catch(error)
    {
        alert(error);
    }
}
const UserEmail=async()=>{
    try{
        const response=await axiosurl.get(`/Questions/email/{eid}`);
       return  response.data;
    }
    catch(error)
    {
        alert(`Invalid Email`);
    }
}
const Tech=()=>{

    const [techData,setTechData]=useState();
    useEffect(
        users()
    ,[]);
    return(
        <>
        <div className="He"><h2>Hellow Tech Approve or Decline Request</h2></div>
        <div className="Content">
            {techData.map((t,index)=>(

             <div className="Users" key={index}>
                <label>{UserEmail(t.user.id)}  Accept{t.accept}</label>
                <button onClick={Acceptance(t.user.id)}>
                    {(t.accept==="true") ?"Accept As Admin":"Decline As Admin"}</button>
            </div>

            ))

            }
        </div>
        
        </>
    )
}