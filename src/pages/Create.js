import React, { useRef, useState } from 'react'
import { createUser } from '../services/userService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const [role, setRole] = useState(0);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const userForm = new FormData();

        userForm.append("name", nameRef.current.value)
        userForm.append("email", emailRef.current.value)
        userForm.append("password", passRef.current.value)
        userForm.append("role", role)
        userForm.append("imageFile", file)

        createUser(userForm).then(res => {
            console.log(res)
            if (res.success === true) {
                toast.success("Sikeresen hozzáadtál egy felhasználót")
                navigate("/")
            }
        })
    }


    return (
        <div className="container">
            <span className="back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
                <Link to={"/"}>Vissza</Link>
            </span>
            <div className="create_bg">
                <div className="create_header">Új felhasználó létrehozása</div>
                <form onSubmit={(e) => handleSubmit(e)} className="create_content">

                    <div className="form_group">
                        <input ref={nameRef} required id="name" type="text" />
                        <label for="name">Teljes név</label>
                    </div>
                    <div className="form_group">
                        <input ref={emailRef} required id="email" />
                        <label for="email">E-Mail</label>
                    </div>
                    <div className="form_group">
                        <input ref={passRef} required id="email" />
                        <label for="email">Jelszó</label>
                    </div>
                    <div className="select">
                        Felhasználó jogosultság
                        <select onChange={(e) => setRole(e.target.value)}>
                            <option value={0}>Felhasználó</option>
                            <option value={1}>Moderátor</option>
                            <option value={2}>Admin</option>
                        </select>

                    </div>
                    <div className="image_form">
                        <span>Kép</span>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file"></input>
                    </div>
                    <input className="submit" value={"Felhasználó létrehozása"} type="submit"></input>
                </form>
            </div>
        </div>
    )
}

export default Create
