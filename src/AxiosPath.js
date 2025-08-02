
import axios from "axios";
//const baseURL = "http://localhost:8081/Questions";
    const baseURL = "https://mcq-backend-production-8fb2.up.railway.app/Questions";
     const axiosurl=axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    });
export default axiosurl;