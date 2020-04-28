import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { getproducts, deleteProduct } from './helper/adminapicall'

const ManageProducts = () => {

    const [products, setProducts] = useState([])
    const {user, token} = isAutheticated();
    const  preload = () =>{
        getproducts().then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    };

    useEffect(() => {
        preload()
    }, []);

    const deleteThisProduct = productId =>{
        deleteProduct(productId,user._id,token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                preload();
            }
        })
    }

    return (
      <Base title="Welcome admin" description="Manage all your products here" className="container">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Go Back</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>
        {products.map((product,index)=>(
          <div className="row text-center mb-2 " key={index}>
          <div className="col-4">
            <p className="text-white text-left">{product.name}</p>
          </div>
          <div className="col-4">
            <Link className="btn btn-success" to={`/admin/product/update/${product._id}`}> Update </Link>
          </div>
          <div className="col-4">
            <button onClick={()=>{deleteThisProduct(product._id)}} className="btn btn-danger">
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

export default ManageProducts
