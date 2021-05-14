const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
         if(err){
             return res.status(400).json({
                 error:"no user in db"
             })
         } 
       req.profile = user
       next()     
    })
};

exports.getUser = (req,res)=>{
    req.profile.salt = " ";
    req.profile.encry_password = " ";
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}

// exports.getAllUsers = (req,res)=>{
//     User.find().exec((err,users)=>{
//         if(err || !users){
//             return res.status(400).json({
//                 error:"no user(s) found"
//             })
//         }
//         res.json(users);
//     })
// }

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new : true , useFindAndModify : false},
        (err,user)=>{
            if(err ){
                return res.send(400).json({
                    error:"not auth to update user"
                })
            }
            user.salt =" "
            user.encry_password = " "
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res)=>{
    Order.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err || !order){
            return res.status(400).json({
                error:"no order found"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req,res,next)=>{
   let purchases = []
   req.body.order.prodcuts.forEach((prodcut)=>{
       purchases.push({
           _id:prodcut._id,
           name : prodcut.name,
           description : prodcut.description,
           category : prodcut.category,
           quantity:prodcut.quantity,
           amount : req.body.order.amount,
           transaction_id:req.body.transaction_id
       })
   });
   //store this in db
   User.findOneAndUpdate(
       {_id:req.profile._id,},
       {$push:{purchases:purchases}},
       {new:true},
       (err,purchase)=>{
           if(err){
               return res.status(400).json({
                   error:"unable to save purchase"
               })
           }
           next()
       }
   )
}