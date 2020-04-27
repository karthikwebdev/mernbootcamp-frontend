import React from 'react'
import Base from "../core/Base"
import {isAutheticated} from "../auth/helper/index"
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    const {user:{name,email,role}} = isAutheticated()

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
            </ul>
        </div>
    )

    return (
        <Base title="" description="Manage all your products and orders here" className="container bg-light p-4">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    {adminLeftSide()}
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    {adminRightSide()}        
                    </div>
                </div>
        </Base>
    )
}

export default AdminDashboard
