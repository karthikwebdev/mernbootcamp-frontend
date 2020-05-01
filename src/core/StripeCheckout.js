import React, { useState, useEffect }  from 'react'
import { isAutheticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from "react-stripe-checkout"


const StripeCheckout = (products) => {

    const [data, setdata] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const {token} = isAutheticated()
    const userId  = isAutheticated().user._id

    const getFinalAmount = (products) => {
        let amount = 0
        console.log(products)
        products.map(product => {
            amount = amount + product.price
        })
        return amount
    }

    const makePayment = (token) => {
        
    }

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton 
            stripeKey=""
            token={makePayment()}
            amount={getFinalAmount(products) * 100}
            name="Buy T-Shirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">pay with stripe</button>
            </StripeCheckoutButton>
        ) : (<Link to="/signin" className="btn btn-warning">
            signin to checkout
        </Link>)
    }


    return (  
        <div className="text-center">
           <h3 className="text-white">Stripe checkout{getFinalAmount(products)}</h3>
           {showStripeButton()} 
        </div>
    )
}

export default StripeCheckout
