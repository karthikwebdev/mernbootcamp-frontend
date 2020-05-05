import React from 'react'
import {API} from '../../backend'

const ImageHelper = ({product}) => {
    const imageUrl = product ? (`${API}/product/photo/${product._id}`) : 'https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
    return (
        <div className="rounded p-2 text-center">
        <img
          src={imageUrl}
          alt="T-Shirt"
          style={{ height:"300px",boxShadow:"0 0 20px black" }}
          className="mb-3 rounded"
          />
      </div>
    )
}

export default ImageHelper
