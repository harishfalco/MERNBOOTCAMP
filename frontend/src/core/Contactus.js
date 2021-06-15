import React,{useState} from 'react'
import Base from './Base'
import { createMessage } from './helper/contacthelper'

const Contactus = () => {
    const [message , setMessage] = useState({
        name:" ",
        email:" ",
        description:" ",
    })

    const { name , email , description , error} = message

    const handleChange =(name)=>event=>{
        setMessage({...message,[name]:event.target.value})
    }

    const onSubmit =(event)=>{
        event.preventDefault();
        setMessage({...message})
        createMessage(message)
        .then(
            data =>{
                if(!data){
                    console.log("error in front-end");
                }
                else{
                    setMessage({
                        name:" ",
                        email:" ",
                        description:" "
                    })
                }
            }
        )
        .catch(error => console.log(error))
    }
    return (
        <Base title="Contact us page" description="Reach out to us for queries">
           
           
                <form className="form-control bg-success ">
                <h1 className="text-white text-center mb-3">Contact us</h1>
                <div className="col-md-8 offset-md-2">
                        <input
                            type="text"
                            className="form-control mb-2 "
                            placeholder="Name"
                            value={name}
                            onChange={handleChange("name")}
                         />
                         <input
                            type="email"
                            className="form-control mb-2 "
                            placeholder="Email"
                            value={email}
                            onChange={handleChange("email")}
                         />
                        <textarea 
                           
                            placeholder="Leave a comment here" 
                            className="form-control mb-3"
                            value={description}
                            onChange={handleChange("description")}
                         >
                         </textarea>
                         <button className="btn btn-warning text-center m-2" style={{marginLeft:"250px"}} onClick={onSubmit}>
                        Submit query
                    </button>
                    </div>
                    
                        
                </form>

           
        </Base>
    )
}

export default Contactus
