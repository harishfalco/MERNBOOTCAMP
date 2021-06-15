const express = require("express")
const { isSignedIn } = require("../controllers/auth")
const router = express.Router()
const {saveMessage} = require("../controllers/Contactus")

router.post("/contactus",saveMessage)


module.exports = router