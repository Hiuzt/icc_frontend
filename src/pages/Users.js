import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/userService'
import { Link } from 'react-router-dom'
import DeletePartial from './DeletePartial'

const Users = () => {
    const [showDelete, setDelete] = useState(0)
    const [data, setData] = useState([])
    const [currentActionID, setActionID] = useState(0)

    const roleList = [
        ["Felhasználó", "base"],
        ["Moderátor", "mod"],
        ["Admin", "admin"],
        
    ]

    useEffect(() => {
        getUsersToList();
    }, [])

    const getUsersToList = () => {
        getUsers().then(res => {
            setData(res.data.users)
        })
    }
    

  return (
    <div className="table-container">
        <div className="outside_header">
            <Link to={"/create"}>Új felhasználó hozzáadása</Link>
            <span className="list_length">Összes felhasználó: {data?.length || 0} db</span>
        </div>
            
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th align='left'>Felhasználó</th>
                    <th align='center'>Regisztráció dátuma</th>
                    <th>Jogosultság</th>
                    <th>Akciók</th>
                </tr>
            </thead>
            <tbody>
            {data.map((listValue, listIndex)  => (
                <tr key={listIndex}>
                    <td align='center'>{listIndex + 1}</td>
                    <td className="user_col">
                        <img src={listValue.imagePath} alt='' className='user-img'/>
                        <div className='name'>
                            <span>{listValue.name}</span>
                            <span>{listValue.email}</span>
                        </div>
                    </td>
                    <td align='center'>
                        {new Date(listValue.createdDate).toLocaleString()}
                    </td>
                    <td align='center'>
                        <span className={`${roleList[listValue?.role || 0][1]}`}>{roleList[listValue.role || 0][0]}</span>
                    </td>
                    <td>
                        <div className="action_col">                     
                            <Link to={`/edit/${listValue?.id}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                            </Link>
                            <svg onClick={() => {
                                setActionID(listValue.id)
                                setDelete(1)                          
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </div>
                    </td>
                </tr>
            ))}   
            </tbody>


        </table>
        {showDelete === 1 && (
            <DeletePartial reloadData = {() => getUsersToList()} modalShow = {() => setDelete(0)} userID = {currentActionID} />
        )}
    </div>
  )
}

export default Users
