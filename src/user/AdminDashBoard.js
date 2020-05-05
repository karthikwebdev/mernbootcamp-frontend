import React, { useEffect, useState } from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { getUser } from './helper/userapicalls'


const AdminDashboard = () => {

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

 
    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark border-light text-light">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-dark text-center">Add Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-dark text-center">Manage Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-dark text-center">Add Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-dark text-center">Manage Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-dark text-center">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }


    const adminRightSide = () => (
        <div className="card mb-4">
            <h4 className="card-header">Info</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-dark mr-2 p-3">
                        Name
                    </span>{name}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-dark mr-2 p-3">
                        Email
                    </span>{email}
                </li>
                <li className="list-group-item">
                    <span className="badge badge-dark mr-2 p-3">
                        lastname
                    </span>{lastname}
                </li>
            </ul>
        </div>
    )

    return (
        <Base title="Welcome Admin" description="Manage all your products and orders here" className="container bg-light p-4 mb-5">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    {adminLeftSide()}
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    {adminRightSide()}
                <Link className="btn btn-info" to={`/user/update/${user._id}`}>Update Details</Link>
                    </div>
                </div>
        </Base>
    )
}

export default AdminDashboard
