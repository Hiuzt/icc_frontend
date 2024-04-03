import { toast } from "react-toastify"
import axios from "../api/axios"

export const getUsers = async () => {
    try {
        const res = await axios.get("/user/")
        return res?.data
    } catch {
        toast.error("Hiba")
    }
}

export const getOneUser = async (userID) =>{
    try {
        const res = await axios.get(`/user/${userID}`);
        return res?.data 
    } catch {
        toast.error("Hiba")
    }
}

export const createUser = async (userForm) => {
    try {
        if (userForm === null) {
            return
        }

        const res = await axios.post("/user/", userForm);
        return res?.data
    } catch {
        toast.error("Hiba")
    }
}

export const deleteUser = async (userID) => {
    try {
        const res = await axios.delete(`/user/${userID}`)

        return res?.data
    } catch {
        toast.error("Hiba")
    }
}

export const editUser = async (userID, userData) => {
    try {
        const res = await axios.put(`/user/${userID}`, userData)
        console.log(res)
        return res?.data
    } catch {
        toast.error("Hiba")
    }
}