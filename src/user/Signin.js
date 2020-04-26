import React, { useState } from "react";
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import {signin, authenticate, isAutheticated } from "../auth/helper/index"

const Signin = () => {

    const [values, setValues] = useState({
        email:"admin@gmail.com",
        password:"admin123",
        error:"",
        loading:false,
        didRedirect: false
    })

    const {email, password, error, loading, didRedirect} = values

    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.err){
                setValues({...values,error:data.err,loading:false})
            }
            else if(data.errmsgs){
                setValues({...values,error:data.errmsgs,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        name:"",
                        lastname:"",
                        email:"",
                        password:"",
                        error:"",
                        didRedirect:true
                    })
                })
            }
        })
        .catch(err =>{console.log("signin failed")})
    }

    const performRedirect = () => {
        if(didRedirect){
            if(isAutheticated() && isAutheticated().user.role){
                return <Redirect to="/admin/dashboard" />
            }
            else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAutheticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return loading && (
            <div className="container">
            <div className="alert alert-info text-center"><p>loading......</p></div>
            </div>
            )
    }
        
    const errorMessage = () => {
                return <div className="container" style={{display: error ?  "" : "none" }}>
                    <div className="alert alert-danger alert-dismissible fade show">
                    {JSON.stringify(error)}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>                 
                </div>
                 </div>
            }

    const signInForm = () =>{
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email
                                <input onChange={handleChange("email")} value={email} type="email" className="form-control" />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password
                                <input onChange={handleChange("password")} value={password} type="password" className="form-control" />
                            </label>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }

    return (
        <Base title="Signin page" description="a page for user to signin!!!!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
            {performRedirect()}
        </Base>
    )
};

export default Signin;