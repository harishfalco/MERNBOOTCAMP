import { API } from "../../Backend"

export const createMessage = (message)=>{
    return fetch(`${API}/contactus`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(message)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err => console.log(err))
}