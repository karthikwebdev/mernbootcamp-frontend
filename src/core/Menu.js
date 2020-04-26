import React from 'react'
import {Link, withRouter } from 'react-router-dom'
import { signout, isAutheticated } from '../auth/helper'


const currentTab = (history,path)=>{
    if(history.location.pathname === path){
        return {color:"#2ecc72"}
    }
    else{
        return {color:"white"}
    }
}

const Menu = ({history}) => (
           <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <p className="navbar-brand" href="#">T-Store</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history,"/cart")} to="/cart">Cart</Link>
            </li>
            {isAutheticated()  && !isAutheticated().user.role && (
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history,"/user/dashboard")} to="/user/dashboard">Dashboard</Link>
            </li>
            )}
            {isAutheticated() && isAutheticated().user.role && (
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history,"/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
            </li>
            )}
            {!isAutheticated() && (<>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history,"/signup")} to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={currentTab(history,"/signin")} to="/signin">Signin</Link>
            </li>
            </>)}
            {isAutheticated() && (<li className="nav-item"><span className="nav-link text-warning" style={{cursor:"pointer"}} onClick={()=>{
                signout(()=>{
                    history.push("/")
                })
            }}>Signout</span></li>)}
        </ul>
        </div>
        </div>
    </nav>
)

export default withRouter(Menu)
