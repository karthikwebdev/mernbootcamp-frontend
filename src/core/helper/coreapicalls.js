import { API } from "../../backend";

export const getProducts = (query) => {
    return fetch(`${API}/products?${query}`,{
        method:'GET'
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}