require('dotenv').config()

//import
const mongoose =require("mongoose");
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const  authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
//connection
mongoose
.connect(process.env.DATABASE,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(
    ()=>{
        console.log('DB CONNECTED');
    }
)
.catch(
    ()=>{
        console.log('DB NOT  CONNECTED');
    }
)

//middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//authentication
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);

//port
const port = process.env.PORT || 8000;

//listen
app.listen(port , ()=>{
    console.log(`app is running  at ${port}`)
})