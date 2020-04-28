import React,{useEffect,useState} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getCategories,deleteCategory } from './helper/adminapicall'
import { isAutheticated } from '../auth/helper'


const ManageCategories = () => {

    const [categories, setcategories] = useState([])
    const { user, token } = isAutheticated()

    const preload = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setcategories(data)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisCategory = (categoryId) => {
        deleteCategory(categoryId,user._id,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                preload()
            }
        })
    }

    return (
       <Base title="Manage Categories" description="update and delete your categories here" className="container">
       <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Go Back</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>
              {categories.map((category,index)=>(
          <div className="row text-center mb-2" key={index}>
            <div className="col-4">
              <p className="text-white text-left">{category.name}</p>
                 </div>
                 <div className="col-4">
                   <Link className="btn btn-success" to={`/admin/category/update/${category._id}`}> Update </Link>
                 </div>
                 <div className="col-4">
                   <button onClick={()=>{deleteThisCategory(category._id)}} className="btn btn-danger">
                     Delete
                   </button>
                 </div>
                 </div>
              ))}
        </div>
      </div>
       </Base>
    )
}

export default ManageCategories
