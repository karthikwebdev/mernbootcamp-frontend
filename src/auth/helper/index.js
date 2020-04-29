import {API} from "../../backend"

export const signup = user =>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json "
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err => console.log(err))
}

export const signin = user =>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json "
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=> console.log(err))
}

export const authenticate = (data,next)=>{
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

export const signout = next =>{
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next();
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(res=>console.log("signout success"))
        .catch(err=> console.log(err))
    }
}

export const isAutheticated = () =>{
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

export const validate = (password) =>{
    let score = 100
    let reasons = []
    if(password.length <= 3){
        score -= 45
        reasons.push("less than 3 characters")
    }
    else if(password.length <= 5){
        score -= 25
        reasons.push("less than 5 characters")
    }
    else if(password.length <= 8){
        score -= 10
        reasons.push("less than 8 characters")
    }
    if(!password.match(/[a-z]/g)){
        score -= 10
        reasons.push("no lowercase characters")
    }     
    if(!password.match(/[A-Z]/g)){
        score -= 10
        reasons.push("no uppercase characters")
    }      
    if(!password.match(/[0-9]/g)){
        score -= 10
        reasons.push("no Numbers")
    }
    if(!password.match(/[^0-9a-zA-Z/s]/g)){
        score -= 10
        reasons.push("no Special Characters")
    }
    if(password.match(/(.)\1/g)){
        score -= 15
        reasons.push("contineous repetitions")
    }
    let strength = `${(score <= 50 && ("poor strength")) || (score > 50 && score <= 85 && ("medium strength")) || (score > 85 && ("good strength"))}`
    let color = `${(score <= 50 && ("text-danger")) || (score > 50 && score <= 85 && ("text-warning")) || (score > 85 && ("text-success"))}`
    let msg = '' 
    if(reasons.length){
        msg ="Your password has " + reasons.map((reason) => `${reason}`)
        msg = `${msg.slice(0,-1)}.`
        return [msg,strength,color]
    }
    return ["",strength,color]
}
