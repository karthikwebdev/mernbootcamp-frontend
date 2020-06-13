import React, { useState } from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup, validate } from "../auth/helper/index"

const Signup = () => {

    const [ values,setValues ] = useState({
        name:"",
        lastname:"",
        email:"",
        password:"",
        confirm:"",
        error:"",
        success:false
    })

    const {name, email, password, confirm, lastname, error, success} = values

    //higher order functions
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        if(password === confirm){
            setValues({...values,error:false})
            signup({name, lastname, email, password})
            .then(data => {
                if(data.errmsgs || data.err){
                    setValues({...values,error:data,success:false})
                }
                else{
                    setValues({
                        ...values,
                        name:"",
                        lastname:"",
                        email:"",
                        password:"",
                        error:"",
                        success:true
                    })
                }
            })    
        }else{
            setValues({...values,error:true})
        }
    }

    const signUpForm = () =>{
        return (
            <div className="container">
            <div className="row">
                <div className="col-10 offset-1 text-center">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name*
                                <input className="form-control" type="text" onChange={handleChange("name")} value={name}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Last Name
                                <input className="form-control" type="text" onChange={handleChange("lastname")} value={lastname}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email*
                                <input type="email" className="form-control" onChange={handleChange("email")} value={email} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password*
                                <input type="password" className="form-control" onChange={handleChange("password")} value={password}/>
                                <span className={validate(password)[2]}>{validate(password)[1]}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Confirm Password*
                                <input type="password" className="form-control" onChange={handleChange("confirm")} value={confirm} />
                                <span className="text-success">{(password === confirm && password !== "" ) ? "matched" : ""}</span>
                            </label>
                        </div>
                        <small id="passwordHelpBlock" className="form-text text-muted mb-2">{validate(password)[0]}</small>
                        <button className="btn btn-success" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
            </div>
               )
    }

    const successMessage = () => (
        <div className="container">
        <div className="alert alert-success alert-dismissible fade show" style={{display: success ?  "" : "none" }} >
            new account was created successfully. please <Link to="/signin">Login here</Link>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        </div>
    )

    const errorMessage = () => {
        if(error){
            if(error.errmsgs){
                const msgs = error.errmsgs.map((e,i)=>{
                    return <div className="alert alert-danger alert-dismissible fade show" key={i}>
                    {e.msg}
                     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>                 
                 </div>
                })
                return (<div className="container">
                    {msgs}
                </div> )
            }
            else if(error.err){
                return (<div className="container">
                     <div className="alert alert-danger alert-dismissible fade show">
                    {error.err}, Email already exists.
                     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>                 
                 </div>
                </div> )
            }
            else{
                return (<div className="container">
                     <div className="alert alert-danger alert-dismissible fade show">
                        password and confirm password didn't match
                     <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>                 
                 </div>
                </div> )
            }
        }
    }

    return (
        <Base title="Signup page" description="a page for user to signup!!!!" className="text-center mb-5">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <div className="mt-3">
            <span className="text-white-50">Already a user!..</span><Link to="/signin">Signin here</Link>
            </div>
        </Base>
    )
};

export default Signup;