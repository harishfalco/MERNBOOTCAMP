import React , {useState , useEffect} from 'react'
import { API } from '../Backend';
import "../styles.css"
import Base from"./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


const Home = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = ()=>{
        getProducts()
        .then( data =>{
            if(data && data.error){
                setError(data.error)
            }
            else{
                setProducts(data)
            }
        }
        )
    };
    useEffect(() => {
      loadAllProducts()
    }, )
    return (
        <Base title="Home page" description="Welcome to the Tshirt Store">
         <h1 className="text-white p-3">Oils</h1>
        <div className="row text-center">
           <hr></hr>
            <div className="row">
                {
                  products.map(
                        (product,index)=>{
                            // console.log("categreies goes here: ",product.category.name.length);
                            if(product.category.name === `oil`){
                                return(
                                    <div key={index} className="col-4 mb-4">
                                             <Card product={product} />
                                    </div>
                                )
                            }   
                        }
                    )
                }
            </div>
        </div>
        {/* snacks category */}
        <h1 className="text-white p-3">Snacks</h1>
        <div className="row text-center">
           <hr></hr>
            <div className="row">
                {
                  products.map(
                        (product,index)=>{
                            // console.log("categreies goes here: ",product.category);
                            if(product.category.name === `snacks`){
                                return(
                                    <div key={index} className="col-4 mb-4">
                                             <Card product={product} />
                                    </div>
                                )
                            }   
                        }
                    )
                }
            </div>
        </div>
        {/* babycare */}
        <h1 className="text-white p-3">BabyCare</h1>
        <div className="row text-center">
           <hr></hr>
            <div className="row">
                {
                  products.map(
                        (product,index)=>{
                            // console.log("categreies goes here: ",product.category);
                            if(product.category.name === `babycare`){
                                return(
                                    <div key={index} className="col-4 mb-4">
                                             <Card product={product} />
                                    </div>
                                )
                            }   
                        }
                    )
                }
            </div>
        </div>
        </Base>    
    )
}

export default Home
