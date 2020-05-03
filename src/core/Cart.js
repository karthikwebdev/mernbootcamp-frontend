import React, {useEffect,useState} from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckout from './StripeCheckout'


function Cart() {

    const [products, setproducts] = useState([]);



    useEffect(() => {
       setproducts(loadCart())
    }, [])
    
    const loadAllProducts = (products) => (
        products && products.length ? (
            <div>
                {products.map((product,index)=>(
                    <Card key={index} product={product} addToCart={false} removeFromCart={true} />
                ))}
            </div>
        ) : (<div className="text-center">
        <div className="text-light">No Products in the Cart</div>
        <Link to="/" className="btn btn-sm btn-info">Go to home</Link>
        </div>)
    
    )
    const loadCheckout = () => {
        return (
            <div>
                {StripeCheckout(products)}
            </div>
        ) 
    }

    return (
        <Base title="Cart Page" description="checkout here......." className="container">
            
            <div className="row">
              <div className="col-lg-6 col-12 p-5">
                  {loadAllProducts(products)}
              </div>
              <div className="col-lg-6 col-12 p-5">
                  {loadCheckout()}
              </div>
            </div>
        </Base>
    )
}

export default Cart
