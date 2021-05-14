const express = require("express")
const router = express.Router()
const {isSignedIn , isAdmin , isAuthenticated}= require('../controllers/auth')
const {getUserById , pushOrderInPurchaseList} = require('../controllers/user')
const{updateStock} = require("../controllers/product")

const {getOrderById,
       createOrder ,
       getAllOrders ,
       getOrderStatus ,
       updateStatus   
      } 
     = require("../controllers/order")

//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)
//create
router.post("/orders/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//read
router.get("/order/all/:userId", isSignedIn , isAuthenticated , isAdmin , getAllOrders)
//statues of order
router.get("/order/status/:userID" ,isSignedIn,isAuthenticated,getOrderStatus )
router.get("/order/:orderId/status/:userID",isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = router