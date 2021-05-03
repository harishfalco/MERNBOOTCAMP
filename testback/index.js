const express = require("express");

const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const port = 3001

app.get("/login" , (req,res)=>{ 
    return res.send("isit bro");
})

//middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//authentication

app.use("/api",authRoutes);

app.get("/harish" , (req,res,)=>{ 
    return res.send("web dev12");
})

const isLoggedin = (res,req,next)=>{
    console.log("logged in");
    next();
}

const isAdmin = (req,res,next) =>{
    console.log("is admin running");
    next();
}
const admin = (req,res)=>{
    return res.send("this is admin");
}
app.get("/admin", isLoggedin , isAdmin , admin);

app.listen(port, ()=>(
    console.log(`server is running on ${port}`)
))