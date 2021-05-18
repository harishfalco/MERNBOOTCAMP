import React from 'react'
import { Link } from 'react-router-dom'
import Menu from "./Menu"

const Base = ({
    title="My title",
    description="My description",
    className="bg-bark text-white p-4",
    children
}) => {
    return (
        <div>
         <Menu />
        <div className="container-fluid">
           <div className="jumbotron bg-dark text-white text-center">
             <h2 className="display-4">{title}</h2>
              <p className="lead">{description}</p>
           </div>
           <div>
              <div className={className}>{children}</div>
           </div>
           <footer className="footer bg-dark mt-auto py-3">
               <div className="conatainer-md text-center py-6">
                 <ul className="list-inline ">    
                     <li className="list-inline-item bg-dark py-3 px-5 fs-4" >
                         <Link to="/" className=" text-decoration-none text-light">Home</Link>
                     </li>
                      <li className="list-inline-item bg-dark fs-4">
                         <Link to="/cart" className=" text-decoration-none text-light" >Cart</Link>
                     </li>
                 </ul>
               </div>
             <div className="conatainer-fluid bg-success text-white text-center p-2">
                 <h4 className="py-4">In case of queries , fell free to reach out...</h4>               
                 <Link to="/contactus">
                     <button className="btn btn-warning btn-lg py-2">Contact us</button>
                 </Link>
             </div>
           </footer>
        </div>
        </div>
    )
}

export default Base
