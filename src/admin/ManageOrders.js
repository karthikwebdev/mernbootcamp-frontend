import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import {getAllOrders} from "./helper/adminapicall"
import { Link } from 'react-router-dom'

const ManageOrders = () => {
    const [orders, setorders] = useState([]);
    const {user,token} = isAutheticated();
    const preload = (id,token) => {
        getAllOrders(id,token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                setorders(data)
            }
        })
        .catch(err => console.log(err))
    }
    useEffect(() => {
        preload(user._id,token)
    }, [])
    return (
        <Base title="Welcome admin" description="Manage all your Orders here" className="container text-white">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Go Back</span>
        </Link>
        <table className="table table-bordered text-white table-responsive-md table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">transaction id</th>
            <th scope="col">date</th>
            <th scope="col">products</th>
            <th scope="col">user</th>
            <th scope="col">status</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
            {orders.map((order,index)=>(
                <tr key={index}>
                    <td>{index}</td>
                    <td>{order.transaction_id}</td>
                    <td> {order.createdAt.split('T')[0]} </td>
                    <td> {order.products.map(product => `${product.name}, `)} </td>
                    <td> {order.user.name} </td>
                    <td> {order.status} </td>
                    <td> <Link to={`/admin/update/order/status/${order._id}`}  className="btn btn-success">Update status</Link> </td>
                </tr>
            ))}
        </tbody>
      </table>
      </Base> 
    )
}

export default ManageOrders
