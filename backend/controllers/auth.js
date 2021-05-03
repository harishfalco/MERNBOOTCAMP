const User = require("../models/user");
const { check , validationResult} = require('express-validator');
const { errors } = require("formidable");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt")
require('dotenv').config()

exports.signup = (req,res) =>{

  const errors  = validationResult(req)

  if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
  })
 }
   var user = new User(req.body)
  
   user.save((err,responseUserObj)=>{
       console.log(responseUserObj);
       if(err || !responseUserObj){
           return res.status(400).json({
               err:"NOT ABLE TO SAVE USER IN DB"
           })
       }
       res.json({
        name: responseUserObj.name,
        email: responseUserObj.email,
        id: responseUserObj._id
      });
   })
};

exports.signout = (req, res)=>{
    res.clearCookie("token")
    res.json({
        message:"user signout"
    })
}

exports.signin = (req,res)=>{

    const errors  = validationResult(req)
    const {email,password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
      })
    }

    User.findOne({email},(err,user)=>{
             if(err || !user){
                 return res.status(422).json({
                     error:"user email doesn't exists"
                 })
             }

             if(!user.authenticate(password)){
                  res.status(401).json({
                      error:"EMail and password do not match"
                  })
             }
            
             //create token
             const token = jwt.sign({_id:user._id},"harish")
            //  console.log(token);
            
             //put token
             res.cookie("token",token,{expire:new Date() + 9999})
            
             //send response
            const {_id,name,email,role}  = user;
            return res.json({token,user:{_id,name,email,role}})
            })
}
//protected routes
exports.isSignedIn = expressJwt({
    secret : "harish",
    userProperty : "auth"
})



//custom middleware
exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
       return res.status(403).json({
           error:"access denied"
       })
    }
    next();
}
exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not admin"
        })
    }
    next();
}