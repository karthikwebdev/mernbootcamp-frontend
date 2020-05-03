import React, {useEffect,useState} from 'react'
import { loadCart, cartEmpty } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import { getmeToken, processPayment } from './helper/paymentBHelper'
import {createOrder} from "./helper/orderHelper"
import { isAutheticated } from '../auth/helper'
import DropIn from "braintree-web-drop-in-react"



const  PaymentB = ({products,setReload = f => f, reload = undefined}) => {

    const [info, setInfo] = useState({
        loading:false,
        success: false,
        clientToken:null,
        error:"",
        instance:{}
    })

    const userId = isAutheticated().user._id
    const token = isAutheticated().token
    const clientToken = info.clientToken

    const getToken = (userId,token) => {
        getmeToken(userId,token).then(info => {
            console.log("info:",info)
            if(info.error){
                setInfo({...info,error:info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken})
            }
        })
    }

    const showDropIn = () => {
        return (
            <div>
                {clientToken != null && products.length ?(
                    <div>
                    <DropIn
                      options={{ authorization: clientToken }}
                      onInstance={(instance) => (info.instance = instance)}
                    />
                    <button className="btn btn-success btn-block" onClick={onPurchase}>Buy</button>
                  </div>
                ):(<h1>please login or add products</h1>)}
            </div>
        )
    }

    useEffect(() => {
       getToken(userId,token)
    }, [])

    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId,token,paymentData)
            .then(res => {
                setInfo({...info,success:res.success, loading:false})
                console.log("successful")
                //todo empty cart
                //todo force reload
            })
            .catch(error => {
                setInfo({loading:false, success:false})
            })
        })
    }

    const getAmount = () => {
        let amount = 0
        products.map((product)=>{
            amount = amount + product.price
        })
        return amount
    } 


    return (
        <div>
            {showDropIn()}
        </div>
    )
}

export default PaymentB
