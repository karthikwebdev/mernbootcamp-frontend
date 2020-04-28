import React from 'react'
import {API} from '../../backend'

const ImageHelper = ({product}) => {
    const imageUrl = product ? (`${API}/product/photo/${product._id}`) : 'https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
    return (
        <div className="rounded p-2">
        <img
          src={imageUrl}
          alt="T-Shirt"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
          />
      </div>
    )
}

export default ImageHelper
