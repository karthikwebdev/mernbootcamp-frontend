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
        email:"",
        purchases:[]
    })
    const {name,lastname,email,purchases} = details

    const preload = () => {
        getUser(user._id,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                const { purchases } = data
                console.log(purchases)
                if(purchases !== []){       
                    let sorted = [purchases[0]]
                    for(let i=1;i<purchases.length;i++){
                        if(sorted[sorted.length-1].transaction_id === purchases[i].transaction_id){
                            sorted[sorted.length-1].name += ", " + purchases[i].name
                        }
                        else{
                            sorted.push(purchases[i])
                        }
                    }
                    setdetails({
                        ...details,
                        name:data.name,
                        lastname:data.lastname,
                        email:data.email,
                        purchases:sorted
                        })
                    }else{
                        setdetails({
                            ...details,
                            name:data.name,
                            lastname:data.lastname,
                            email:data.email,
                            purchases:[]
                            })    
                        }
                    }
            })
        }

    useEffect(() => {
        preload()
    }, [])


    const loadOrders = (purchases) =>(purchases.map((value,index)=>
        value ? (<tr key={index}>
               <th scope="col">{index+1}</th>
               <th scope="col">{value.name}</th>
               <th scope="col">{value.transaction_id}</th>
               <th scope="col">{value.amount}</th>
               </tr>): (<h1 className="text-center">no orders yet</h1>) ))

    const userDashboard = () =>(
                <div className="card">
                <h4 className="card-header bg-dark border-light text-light">view details</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-dark mr-2 p-3">name:</span>{name}
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-dark mr-2 p-3">email:</span>{email}
                    </li>
                    <li className="list-group-item">
                    <span className="badge badge-dark mr-2 p-3">lastname:</span>{lastname}
                    </li>
                </ul>
                <div className="card-footer">
                    <Link className="btn btn-info" to={`/user/update/${user._id}`} >update details</Link>
                    <h2 className="text-center">Your Orders</h2>
                    <table className="table table-bordered table-hover table-responsive-sm table-responsive-md">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">products</th>
                            <th scope="col">transaction id</th>
                            <th scope="col">amount</th>
                            </tr>
                        </thead>
                        <tbody>
                           {loadOrders(purchases)}
                        </tbody>
                    </table>
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
