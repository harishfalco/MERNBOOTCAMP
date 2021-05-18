import { API } from "../../Backend"

export const createMessage = (message)=>{
    return fetch(`${API}/contactus`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        },
        body:message
    })
    .then(response =>{
        return response.json()
    })
    .catch(error => console.log(error))
}