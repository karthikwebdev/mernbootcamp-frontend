import { API } from "../../backend"


 export const getSingleProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method:"GET"        
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}
