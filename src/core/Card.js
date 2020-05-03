import React, {useState} from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect, Link } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Card = ({product,
addToCart = true,
removeFromCart = false,
}) => {

  const [reload, setreload] = useState(false);

  const cardTitle = product ? product.name : "a sample photo"
  const cardDescription = product ? product.description : "a sample photo description"
  const cardPrice = product ? product.price : "price"
  const cardStock = product ? product.stock : "stock"

  const addToTheCart = () => {
    addItemToCart(product,(product)=> {
      toast.success(`${product.name} added to cart successfully`,{position:toast.POSITION.TOP_RIGHT,className:'text-light'});
    })
  }

  const removeAndReload = (productId) =>{
    removeItemFromCart(productId,()=> {
      setreload(true)
      toast.error(`item removed from the cart`,{position:toast.POSITION.TOP_RIGHT,className:'text-light'})
    })
  }

  const getReload = () => (
    reload && (
      <Redirect to="/reload" />
    )
  )

  const showAddToCart = (addToCart) => (
      addToCart && (
      <div className="col-12">
      <button onClick={addToTheCart} className="btn btn-block btn-success mt-2 mb-2">
        Add to Cart
      </button>
      </div>
     )
  )

  const showRemoveFromCart = (removeFromCart) => (
    removeFromCart && (
      <div className="col-12">
        <button onClick={() => {
          removeAndReload(product._id)
        }} className="btn btn-block btn-danger mt-2 mb-2">
          Remove from cart
        </button>
      </div>
    )
  )

        return (
          <div className="card text-white bg-light m-lg-3 m-md-2 mx-2 my-3 text-center text-capitalize">
            <div className="card-header lead text-dark">{cardTitle}</div>
            <div className="card-body">
              {getReload(reload)}
              <ImageHelper product= {product} />
              <p className="text-wrap h6 text-black-50">
                {cardDescription}
              </p>
              <h1 className=" font-italic text-dark">${cardPrice}</h1>
              <p className="text-black-50">stock available:{cardStock}</p>
              <div className="row">
               {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
                <div className="col-12">
                  <Link className="btn btn-block btn-info mt-2 mb-2" to={`/product/view/${product._id}`}> View Product </Link>
                </div>
              </div>
            </div>
          </div>
        );
      };

export default Card
