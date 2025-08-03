import { useEffect, useState } from "react";
import axiosurl from "../AxiosPath";

const Tech = () => {
  const [techData, setTechData] = useState([]);

  // Fetch all tech users
  const fetchUsers = async () => {
    try {
      const response = await axiosurl.get(`/Questions/Tech`);
      setTechData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  // Toggle accept/decline
  const handleAcceptance = async (userId) => {
    try {
      const response = await axiosurl.put(`/Questions/User/Accept/${userId}`);
      alert(response.data);
      fetchUsers(); // refresh data after update
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  // Get user email by id
  const getUserEmail = async (id) => {
    try {
      const response = await axiosurl.get(`/Questions/email/${id}`);
      return response.data;
    } catch (error) {
      alert("Invalid Email");
      return "";
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="He">
        <h2>Hello Tech, Approve or Decline Request</h2>
      </div>
      <div className="Content">
        {techData.map((t, index) => (
          <div className="Users" key={index}>
            <label>
              {t.user?.email || "Loading email..."} Accept: {t.accept}
            </label>
            <button onClick={() => handleAcceptance(t.user.id)}>
              {t.accept === "true" ? "Decline As Admin" : "Accept As Admin"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tech;
