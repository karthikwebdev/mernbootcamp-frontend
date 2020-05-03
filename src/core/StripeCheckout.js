import React, { useState }  from 'react'
import { isAutheticated } from '../auth/helper'
import { cartEmpty } from './helper/cartHelper'
import { Link, Redirect } from 'react-router-dom'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'

const StripeCheckout = (products) => {

    const [data, setdata] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const { success } = data

    const getFinalAmount = (products) => {
        let amount = 0
        products.map(product => {
            amount = amount + product.price
        })
        return amount
    }

    const makePayment = (token) => {
        const body = {
            token,products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(data => {
            const {city,country,line1,postal_code,name} = data.shipping.address
            const transaction_id = data.id;
            const amount = data.amount / 100;
            const address = `${name},${line1},${city},${postal_code},${country}`
            createOrder(isAutheticated().user._id,isAutheticated().token,{transaction_id,amount,address,products})
            .then(res => {
                cartEmpty(()=>{
                    setdata({success:true})
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton 
            stripeKey="pk_test_QMKZD89sJAUimiPDBud2OUCD00gcbSGhZU"
            token={makePayment}
            amount={getFinalAmount(products) * 100}
            name="pay for books here"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">pay with stripe</button>
            </StripeCheckoutButton>
        ) : (<Link to="/signin" className="btn btn-warning">
            signin to checkout
        </Link>)
    }

    const successMessage = () => (
        success && (<Redirect to="/reload" />)
    )

    return (
        <div>
        {successMessage()}
        <div className="text-center">
           <h5 className="text-white">Stripe checkout: <p>${getFinalAmount(products)}</p></h5>
           {showStripeButton()}
        </div>
        </div>
    )
}

export default StripeCheckout
