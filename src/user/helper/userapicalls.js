import { API } from "../../backend"

export const getUser = (userId,token) =>{
    return fetch(`${API}/user/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const updateUser = (updatedUser,userId,token) => {
    return fetch(`${API}/user/${userId}`,{
        method:'PUT',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(updatedUser)  
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}