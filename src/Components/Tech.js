import { useEffect, useState } from "react";
import axiosurl from "../AxiosPath";
import "./Tech.css"
const Tech = () => {
  const [techData, setTechData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosurl.get(`/Questions/Tech`);
      setTechData(response.data);
    } catch (error) {
      alert("Error fetching users: " + error);
    }
  };

  const handleAcceptance = async (id) => {
    try {
      const response = await axiosurl.put(`/Questions/User/Accept/${id}`);
      alert(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="main">
      <div className="He">
        <h2>Hello Tech, Approve or Decline Request</h2>
      </div>
      <div className="Content">
        {techData.length > 0 ? (
          techData.map((t, index) => (
            <div className="Users" key={index}>
              <label>
                {t.email}Accept: {t.accept}  Role: {t.roll}
              </label>
              <button onClick={() => handleAcceptance(t.id)}style={{ color: t.accept === "true" ? "green" : "red" }}>
                {t.accept === "true" ? "Decline As Admin" : "Accept As Admin"}
              </button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Tech;
