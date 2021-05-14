import DropIn from 'braintree-web-drop-in-react'
import React ,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { getmeToken, processPayment } from '../paymentBHelper'
import { cartEmpty, loadCart } from './helper/cardhelper'
import { getProducts } from './helper/coreapicalls'
import { createOrder } from './helper/orderHelper'


const Paymentb = ({products,setReload = f => f , reload = undefined }) => {
    
   const userId = isAuthenticated() && isAuthenticated().user._id
   const token = isAuthenticated() && isAuthenticated().token

   
    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:" ",
        instance: {}
    })

    const getToken = (userId,token)=>{
        getmeToken(userId,token)
        .then(info =>{
            // console.log("information: ",info);
            if(info && info.error){
                setInfo({...info , error:info.error})
            }else{
                const clientToken =info.clientToken
                setInfo({clientToken})
            }
        })
    }
    
    const showbtdropIn = ()=>{
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ?
                  (
                    <div>
                        <DropIn
                        options={{ authorization: info.clientToken }}
                        onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn w-100 btn-success" onClick={onPurchase}>Buy</button>
                  </div>
                  ):(
                      <h3>Please log in or add some thing to cart</h3>
                  )
                  }
            </div>
        )
    }

    useEffect(() => {
      getToken(userId,token)
    }, [])

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce ;
        
        getNonce = info?.instance?.requestPaymentMethod()
        .then(data => {
          nonce = data?.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processPayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              const orderData = {
                  products : products,
                  transaction_id:response.transaction.id,
                  amount : response.transaction.amount,
              }
              createOrder(userId , token,orderData);
              //TODO: empty the cart
              cartEmpty(()=>{
                  console.log("Did we  got a crash");
              })
              //TODO: force reload
              setReload(!reload)
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };
    
    const getAmount = ()=>{
        let amount = 0
        products.map(p =>{
            amount = amount+p.price
        })
        return amount;
    }
    return (
        <div>
            <h3>Your bill is {getAmount()}</h3>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb
