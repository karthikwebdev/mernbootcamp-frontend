import React, {useState,useEffect } from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link, Redirect } from 'react-router-dom'
import { updateOrderStatus,getOrderStatus } from './helper/adminapicall'


const UpdateOrderStatus = ({match}) => {
    return (
        <div className="text-white">
            {match.params.orderId}
        </div>
    )
}

export default UpdateOrderStatus
