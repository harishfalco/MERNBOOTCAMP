const express = require('express');
const router = express.Router()

const {signout ,signup , signin, isSignedIn  } = require("../controllers/auth")
const {check} = require('express-validator')

router.post("/signup",[
    check("name","name not enough").isLength({min:5}),
    check("email","email is nedded").isEmail(),
    check("password","password not enough").isLength({min:5})

],signup)

router.post("/signin",
[
    check("email","email is nedded").isEmail(),
    check("password","password feild is required").isLength({min:1})

]
,signin)


router.get("/signout", signout)


router.get("/testroute" , isSignedIn, (req,res)=>{
    res.json(req.auth)
})


module.exports = router;