import React, { useEffect,useState } from 'react'
import Base from './Base'
import ImageHelper from './helper/ImageHelper'
import { getSingleProduct } from './helper/viewHelper'
import { Link } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'



const ViewProduct = ({match}) => {

    const [product, setproduct] = useState({})
    const [success, setsuccess] = useState(false);

    
    const loadProduct = (productId) => {
        getSingleProduct(productId)
        .then(data => {
            if(data.error){
                console.log("err:",data)
            }else{
                setproduct(data)
                console.log(data.category.name)
            }
        })
    }

    useEffect(() => {
        loadProduct(match.params.productId)
    }, [])

    
  const addToTheCart = () => {
    addItemToCart(product,()=> setsuccess(true))
  }

  const successMessage = (success,product) => {
    return  success && (<div className="alert alert-success">{product.name} added to cart successfully</div>) 

  }

    const viewPage = (product) => (
        <>
        {successMessage(success,product)}
        <Link className="mx-3 btn btn-info btn-sm" to="/">Go Back</Link>
        <div className="row">
            <div className="col-lg-6 col-12">
                <ImageHelper product={product}/>
            </div>
            <div className="col-lg-6 col-12 py-5">
                <h1 className="text-center text-lg-left text-white-50">{product.name}</h1>
                <h5 className="text-center text-lg-left">{product.description}</h5>
                <h3 className="text-center text-lg-left display-2"><span className="h5 mr-2">price:</span>${product.price}</h3>
                <p className="text-muted">Stock Available: {product.stock}</p>
                <button className="btn btn-block btn-success" onClick={addToTheCart}> add to cart </button>
            </div>
        </div>
        </>
    )

    return (
        <Base title="" description="" className="container text-light">
            {viewPage(product)}
        </Base>
    )
}

export default ViewProduct
