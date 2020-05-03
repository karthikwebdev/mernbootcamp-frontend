import React, { useState,useEffect } from "react";
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import { validate, isAutheticated } from "../auth/helper/index"
import { getUser,updateUser } from "./helper/userapicalls";


const UpdateUser = () => {

    const [values,setValues] = useState({
        name:"",
        lastname:"",
        email:"",
        error:"",
        success:false
    })


    const {name, email, lastname, error, success} = values
    const {token,user} = isAutheticated()

    //higher order functions
    const handleChange = name => event => {
        setValues({...values,error:false,[name]:event.target.value})
    }

  
    const preload = () => {
        getUser(user._id,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({
                    ...values,
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

    const onSubmit = event => {
        event.preventDefault()
            setValues({...values,error:false})
            updateUser({name, lastname, email},user._id,token)
            .then(data => {
                console.log(data)
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
    }

    const updateForm = () =>{
        return (
            <div className="container">
            <div className="row">
                <div className="col-10 offset-1 text-center">
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
                        <button className="btn btn-success" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
            </div>
               )
    }

    const successMessage = () => (
        success && (
            <Redirect to="/user/dashboard" />
        ) 
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
        }
    }

    return (
        <Base title="Update Details" description="a page to update details!!!!">
            {successMessage()}
            {errorMessage()}
            {updateForm()}
        </Base>
    )
};

export default UpdateUser;