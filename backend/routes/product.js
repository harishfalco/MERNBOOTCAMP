const express = require("express")
const router = express.Router();


const {getProductId , createProduct , getProduct ,  photo , removeProduct,updateProduct , getAllProducts , getAllUniqueCategories} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const {isAuthenticated,isAdmin,isSignedIn} = require("../controllers/auth")

//params
router.param("userId",getUserById);
router.param("productId",getProductId);

//routes
router.post("/product/create/:userID",isSignedIn,isAuthenticated,isAdmin,createProduct);
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
//delete
router.delete("/product/:productId/:userId",removeProduct)
//update
router.put("/product/:productId/:userID",isSignedIn,isAuthenticated,isAdmin,updateProduct)
//listing
router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)
module.exports = router