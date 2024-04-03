import React from 'react'
import { deleteUser } from '../services/userService';
import { toast } from 'react-toastify';

const DeletePartial = (props) => {
    const handleDelete = () => {
        props.modalShow();
        deleteUser(props.userID).then(res => {
            if (res.success) {
                toast.success("Sikeresen kitörltél egy felhasználót!")
                props.reloadData()
            }
        })
    }

    return (
        <div onClick={() => props.modalShow()} className="delete_container">
            <div onClick={(e) => e.stopPropagation()} className="delete_bg">
                <div className="delete_header">Biztosan kiszeretnéd törölni ezt a felhasználót? ({props.userID})</div>
                <div className="delete_content">Ez az akció után már a felhasználó törlése nem vonható vissza semmilyen esetben sem!</div>

                <div className="buttons">
                    <button onClick={() => props.modalShow()}>Mégsem szeretném törölni</button>
                    <button onClick={() => handleDelete()}>Igen, törölni szeretném</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePartial
