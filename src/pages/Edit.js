import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editUser, getOneUser } from '../services/userService';
import { toast } from 'react-toastify';

const Edit = () => {
    const userID = useParams().userID

    const [userForm, setUserForm] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userForm_send = new FormData();

        userForm_send.append("name", userForm["name"])
        userForm_send.append("email", userForm["email"])
        userForm_send.append("password", userForm["password"])
        userForm_send.append("role", userForm["role"])
    
        editUser(userID, userForm_send).then(res => {
            if (res.success) {
                toast.success("Sikeresen szerkesztetted a felhasználót!")
                navigate("/")
            } else {
                toast.error("Valami hiba történt szerkesztés során!")
            }
        }) 
    }

    useEffect(() => {
        getOneUser(userID).then(res => {
            setUserForm(res.data.users)
        })
    }, [userID])


    return (
        <div className="container">
            <span className="back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                <Link to={"/"}>Vissza</Link>
            </span>
            {userForm !== null && (

                <div className="create_bg">
                    <div className="create_header">Felhasználó szerkesztése</div>
                    <form onSubmit={(e) => handleSubmit(e)} className="create_content">

                        <div className="form_group">
                            <input value={userForm["name"]} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required id="name" type="text" />
                            <label htmlFor="name">Teljes név</label>
                        </div>
                        <div className="form_group">
                            <input value={userForm["email"]} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required id="email" />
                            <label htmlFor="email">E-Mail</label>
                        </div>
                        <div className="form_group">
                            <input value={userForm["password"]} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required id="password" />
                            <label htmlFor="password">Jelszó</label>
                        </div>
                        <div className="select">
                            Felhasználó jogosultság
                            <select  defaultValue={userForm["role"]} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                                <option value={0}>Felhasználó</option>
                                <option value={1}>Moderátor</option>
                                <option value={2}>Admin</option>
                            </select>

                        </div>
                        <div className="image_form">
                            <span>Kép (Ha nem módosítod ne tölts fel újat!)</span>
                            <input type="file"></input>
                        </div>
                        <input className="submit" value={"Felhasználó szerkesztése"} type="submit"></input>
                    </form>
                </div>
            )}

        </div>
    )
}

export default Edit
