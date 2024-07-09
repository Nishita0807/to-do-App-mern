import axios from "axios"
const instance = axios.create({
    baseURL:"https://to-do-app-mern-backend.vercel.app/api"
})
export default instance
