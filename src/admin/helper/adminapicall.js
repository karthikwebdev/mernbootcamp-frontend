import { API } from "../../backend";

//create category API call
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
       },
        body:JSON.stringify(category)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err))
}
//get all categories
export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}


//product calls

//create a product
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
       },
       body:product
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

//get all products
export const getproducts = () => {
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
       }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

//get a product
export const getProduct = productId =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}


//update a product
export const updateProduct = (productId,userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
       },
       body:product
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}