import React from 'react'
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
             <div className="conatainer-fluid bg-success text-white text-center">
                 <h4>IF u have any questions feel free to reacn out</h4>
                 <button className="btn btn-warning btn-lg py-3">Contact us</button>
             </div>
             <div className="conatainer">
                 <span className="text-muted">
                     An amazing place to buy oil   
                 </span>
            </div>
           </footer>
        </div>
        </div>
    )
}

export default Base
