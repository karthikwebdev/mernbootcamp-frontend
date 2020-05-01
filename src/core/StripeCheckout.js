import React, { useState, useEffect }  from 'react'
import { isAutheticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'


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

    const showStripeButton = () => {
        return isAutheticated() ? (
            <button className="btn btn-success">pay with stripe</button>
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
