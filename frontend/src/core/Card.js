import React,{useState,useEffect} from 'react'
import { Redirect } from 'react-router';
import { addItemToCart , removeItemToCart } from './helper/cardhelper';
import ImageHelper from './helper/ImageHelper'

    const Card = ({
      product,
      addtoCart = true,
      removeFromCart = false ,
       setReload = (f)=> (f),//just returns what you give 
       reload = undefined
      }) => {
        const [redirect , setRedirect] = useState(false);
        const [count , setCount] = useState(product.count)
      
      
      
      const cardTitle = product ?  product.name :"photo from pexels"    
      const cardDescription = product ?  product.description:"photo from defaults"    
      const cardPrice = product ?  product.price:"defaults"    
       
      
      const addToCart = ()=>{
        addItemToCart(product,()=>setRedirect(true)) 
      }
      
      const getARedirect = (redirect)=>{
         if(redirect){
           return <Redirect to="/cart" />
         }
       }

        const showAddtoCart = (addtoCart)=>{
               return(
                   addtoCart && (
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                   )
               )
            }
            const showRemoveAddtoCart = (removeFromCart)=>{
                return(
                    removeFromCart &&(
                        <button
                        onClick={() => {
                          removeItemToCart(product._id)
                          setReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2"
                      >
                        Remove from cart
                      </button>
                    ) 
                )
            }

        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
              <ImageHelper product={product} />
              <p className="lead bg-success font-weight-normal text-wrap">
                {
                    cardDescription
                }
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
              <div className="row">
                <div className="col-12">
                    {
                        showAddtoCart(addtoCart)
                    }
                 
                </div>
                <div className="col-12">
                    {
                        showRemoveAddtoCart(removeFromCart)
                    }
                </div>
              </div>
            </div>
          </div>
        );
      };


export default Card
