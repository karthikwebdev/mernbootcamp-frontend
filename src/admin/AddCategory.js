import React, {useState} from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import {createCategory} from "./helper/adminapicall"

const AddCategory = () => {

    const [name, setName] = useState("beach")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAutheticated() 

    const goBack = () => (
        <div>
            <Link className="btn btn-sm btn-info mt-3" to="/admin/dashboard">Go Back</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setName(event.target.value)
    }

    
    const onSubmit = (event) =>{
        event.preventDefault()
        setError("");
        setSuccess(false)
        createCategory(user._id,token,{name})
            .then(data =>{
                console.log(data)
                if(data.error){
                    setError(true)
                }else{
                    setError("")
                    setSuccess(true)
                }
            })
    }

    const myCategoryForm = () =>(
        <form>
            <div className="form-group my-3">
                <label >Enter Category
                </label>
                <input className="form-control" type="text" onChange={handleChange} value={name} autoFocus required placeholder="For Ex. Summer " />
                <button className="btn btn-dark text-light mt-3" onClick={onSubmit} >create category</button>
            </div>
        </form>
    )

    return (
        <Base title="create category" description="Add a new category for T-Shirts" className="container p-4">
            <div className="row bg-light rounded">
                <div className="col-8 offset-2">
                    {goBack()}
                    
                    {myCategoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
