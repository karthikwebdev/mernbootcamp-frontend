import React, {useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link,Redirect } from 'react-router-dom'
import { getCategories, createaProduct } from './helper/adminapicall'
import { isAutheticated } from '../auth/helper/index'

const AddProduct = () => {

    const {user,token} = isAutheticated()

    const [values, setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getaRedirect: false,
    formData:""
    });

    const { name, description, price, stock, categories, category, loading, error, createdProduct, getaRedirect, formData } = values
   
    const preload = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{ 
                setValues({...values,categories:data, formData: new FormData()})
            }
        });
    }
    
    useEffect(() => {
        preload();
    }, [])


    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values,error:"",loading:true})
        createaProduct(user._id, token, formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name:"",description:"",price:"",photo:"",stock:"",loading:false,createdProduct:data.name,getaRedirect:true})
            }
        })
    }

    const successMessage = () => {
      return (<div className="alert alert-success mt-3" style={{display: createdProduct ? "" : "none" }}>
                {createdProduct} created successfully
              </div>)
    } 
      
    const errorMessage = () => {
      return (<div className="alert alert-danger mt-3" style={{display: error ? "" : "none" }}> {error} </div>)
   
    }

    const loadingMessage = () => (
      <div className="alert alert-warning mt-3" style={{display: loading ? "" : "none" }}>
          loading.....
      </div>
    )

     const makeRedirect = ()=>{
      return setTimeout(() =>{
        return getaRedirect && (<Redirect to="/admin/dashboard" />)
      }, 2000); 

     }


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values,[name]:value,error:""})
    }

    const createProductForm = () => (
        <form>
            <div className="form-group">
            <div className="custom-file">
                <input type="file" className="custom-file-input border-dark" accept="image" onChange={handleChange("photo")} id="customFile" />
                <label className="custom-file-label">Choose file</label>
            </div>
            </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control border-dark"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control border-dark"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control border-dark"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select onChange={handleChange("category")} className="form-control border-dark" placeholder="Category">
              <option>Select</option>
             {categories && categories.map((cate,index)=>(
              <option key={index} value={cate._id}>{cate.name}</option>
             ))}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control border-dark"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-dark">
            Create Product
          </button>
        </form>
      );

    return (
        <Base title="Add Product Here!" description="this is a place to add new products" className="container bg-light p-4 text-light">
        <Link to="/admin/dashboard" className="btn btn-sm btn-dark">Go Back</Link>
        <div className="row rounded">
            <div className="col-8 offset-2">
                {makeRedirect()}
                {loadingMessage()}
                {errorMessage()}
                {successMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    )
}

export default AddProduct
