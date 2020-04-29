import React, { useEffect,useState } from 'react'
import Base from "../core/Base"
import { getUser } from './helper/userapicalls'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'

const UserDashboard = () => {

    const {token,user} = isAutheticated()
    const [details, setdetails] = useState({
        name:"",
        lastname:"",
        email:""
    })
    const {name,lastname,email} = details

    const preload = () => {
        getUser(user._id,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setdetails({
                    ...details,
                    name:data.name,
                    lastname:data.lastname,
                    email:data.email
                })
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const userDashboard = () =>(
                <div className="card">
                <h4 className="card-header bg-dark border-light text-light">view details</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-dark mr-2">name:</span>{name}
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-dark mr-2">email:</span>{email}
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-dark mr-2">lastname:</span>{lastname}
                    </li>
                </ul>
                <div className="card-footer">
                    <Link className="btn btn-info" to={`/user/update/${user._id}`} >update details</Link>
                </div>
            </div>
    )

    return (
        <Base title="User Dashboard page" description="view and update user details here!" className="container">
        {userDashboard()}
        </Base>
    )
}

export default UserDashboard
