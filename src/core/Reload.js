import React from 'react'
import { Redirect } from 'react-router-dom'

function Reload() {
    return (
        <div>
            <Redirect to="/cart"/>
        </div>
    )
}

export default Reload
