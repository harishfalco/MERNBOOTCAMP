import React , {useState , useEffect} from 'react'
import { API } from '../Backend';
import "../styles.css"
import Base from"./Base"
import Card from './Card';
import { loadCart } from './helper/cardhelper';
import { getProducts } from './helper/coreapicalls';
import Paymentb from './Paymentb';


const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload , setReload] = useState(false);

    useEffect(()=>{
       setProducts(loadCart())
    },[reload ])
    
    const loadAllProducts = ()=>{
        return(
            <div>
                <h2>This section is to load products</h2>
                {products.map((product,index)=>(
                    <Card
                     key={index}
                     product={product}
                     addtoCart = {false}
                     removeFromCart = {true}
                     setReload={setReload}
                     reload={reload}
                     />
                ))}
            </div>
        )
    }

    const loadCheckout = ()=>{
        return(
            <div>
               <Paymentb />
            </div>
        )
    }
    
    return (
        <Base title="Cart page" description="reday to checkout">
        <div className="row text-center">
          <div className="col-6">
              {products.length > 0 ? loadAllProducts() : 
                <h3>No products to show</h3>}
              </div>
          <div className="col-6"><Paymentb products={products} setReload={setReload} reload = {reload} /></div>
           
        </div>
        </Base>    
    )
}

export default Cart
