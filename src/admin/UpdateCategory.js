import React, { useState,useEffect } from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link,Redirect } from 'react-router-dom'
import { updateCategory,getCategory } from './helper/adminapicall'

const UpdateCategory = ({match}) => {
    
    const [name, setName] = useState("")
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

    const preload= (categoryId) =>{
        getCategory(categoryId)
        .then(data =>{
            setName(data.name)
        } )
    }

    useEffect(() => {
       preload(match.params.categoryId)
    }, [])
    
    const onSubmit = (event) =>{
        event.preventDefault()
        setError("");
        setSuccess(false)
        updateCategory(match.params.categoryId,user._id,token,{name})
            .then(data =>{
                if(data.error){
                    setError(data.error)
                }else{
                    setError("")
                    setName("")
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
                <button className="btn btn-dark text-light mt-3" onClick={onSubmit} >update category</button>
            </div>
        </form>
    )

    const successMessage = () => (
        success && (
            <div className="alert alert-success alert-dismissible fade show text-center mt-3">
                category successfully added....
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>                 
            </div>
        )
    )

    const errorMessage = () => (
        error && (
            <div className="alert alert-danger alert-dismissible fade show text-center mt-3">
                {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>                 
            </div>
        )
    )

    const redirect = () => (
        success && (<Redirect to="/admin/dashboard" />)
    )

    return (
        <Base title="create category" description="Add a new category for T-Shirts" className="container p-4">
            <div className="row bg-light rounded">
                <div className="col-8 offset-2">
                    {redirect()}
                    {goBack()}
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory
