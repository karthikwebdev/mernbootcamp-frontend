import React, { useState } from "react";
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup, validate } from "../auth/helper/index"

const Signup = () => {

    const [values,setValues] = useState({
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
                if(data.errmsgs){
                    setValues({...values,error:data,success:false})
                    console.log(data)
                }
                else if(data.err){
                    setValues({...values,error:data,success:false})
                    console.log(data)
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

    const validate = () =>{
        let score = 100
        let reasons = []
        if(password.length <= 3){
            score -= 45
            reasons.push("less than 3 characters")
        }
        else if(password.length <= 5){
            score -= 25
            reasons.push("less than 5 characters")
        }
        else if(password.length <= 8){
            score -= 10
            reasons.push("less than 8 characters")
        }
        if(!password.match(/[a-z]/g)){
            score -= 10
            reasons.push("no lowercase characters")
        }     
        if(!password.match(/[A-Z]/g)){
            score -= 10
            reasons.push("no uppercase characters")
        }      
        if(!password.match(/[0-9]/g)){
            score -= 10
            reasons.push("no Numbers")
        }
        if(!password.match(/[^0-9a-zA-Z/s]/g)){
            score -= 10
            reasons.push("no Special Characters")
        }
        if(password.match(/(.)\1/g)){
            score -= 15
            reasons.push("contineous repetitions")
        }
        let strength = `${(score <= 50 && ("poor strength")) || (score > 50 && score <= 85 && ("medium strength")) || (score > 85 && ("good strength"))}`
        let color = `${(score <= 50 && ("text-danger")) || (score > 50 && score <= 85 && ("text-warning")) || (score > 85 && ("text-success"))}`
        let msg = '' 
        if(reasons.length){
            msg ="Your password has " + reasons.map((reason) => `${reason}`)
            msg = `${msg.slice(0,-1)}.`
            return [msg,strength,color]
        }
        return ["",strength,color]
    }

    const signUpForm = () =>{
        return (
            <div className="container">
            <div className="row">
                <div className="col-6 offset-3 text-center">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name
                                <input className="form-control" type="text" onChange={handleChange("name")} value={name}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Last Name
                                <input className="form-control" type="text" onChange={handleChange("lastname")} value={lastname}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email
                                <input type="email" className="form-control" onChange={handleChange("email")} value={email} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password
                                <input type="password" className="form-control" onChange={handleChange("password")} value={password} data-toggle="password"/>
                                <span className={validate()[2]}>{validate()[1]}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Confirm Password
                                <input type="password" className="form-control" onChange={handleChange("confirm")} value={confirm} />
                                <span className="text-success">{(password === confirm && password !== "" ) ? "matched" : ""}</span>
                            </label>
                        </div>
                        <small id="passwordHelpBlock" className="form-text text-muted mb-2">{validate()[0]}</small>
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
                    {error.err}Email already exists.
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
        <Base title="Signup page" description="a page for user to signup!!!!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
};

export default Signup;