import axios from "axios"

export default axios.create({
    baseURL: "https://backend20240403160743.azurewebsites.net/api",
    withCredentials: true,
})
