
import axios from "axios";

   // const baseURL = "https://mcq-backend-production-8fb2.up.railway.app";
   const baseURL="https://mcq-backend-4uvs.onrender.com";
     const axiosurl=axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
export default axiosurl;