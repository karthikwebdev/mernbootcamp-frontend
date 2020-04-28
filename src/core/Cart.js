import React, {useEffect,useState} from 'react'
import { API } from '../backend'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'

function Cart() {

    const [products, setproducts] = useState([]);



    useEffect(() => {
       setproducts(loadCart())
    }, [])
    
    const loadAllProducts = () => {
        return (
            <div>
                {products.map((product,index)=>(
                    <Card key={index} product={product} addToCart={false} removeFromCart={true} />
                ))}
            </div>
        ) 
    }

    const loadCheckout = () => {
        return (
            <div>
                <h1>this is to checkout products</h1>
            </div>
        ) 
    }

    return (
        <Base title="cart Page" description="checkout here......." className="container">
            
            <div className="row">
              <div className="col-lg-6 col-12 p-5">
                  {loadAllProducts()}
              </div>
              <div className="col-lg-6 col-12 p-5">
                  {loadCheckout()}
              </div>
            </div>
        </Base>
    )
}

export default Cart
