const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "qz97wtzc9jfk8w3y",
  publicKey: "2xck87zs7fqd5by6",
  privateKey: "507831c19536b7dfbc812668170399a6"
});



exports.getToken =(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
       if(err){
           res.status(500).send(err)
       }
       else{
           res.send(response)
       }
      });
}

exports.processPayment = ()=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount:amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
            res.status(500).json(err)
          }else{
              res.json(result);
          }
      });
}