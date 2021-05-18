const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs");
const { isBuffer, sortBy } = require("lodash");
const router = require("../routes/product");

exports.getProductId = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error:"cannot find product"
            })
        }
        res.profile = product
        next()
    })
}

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
        //destructure the feilds
        const {name,description,price,category,stock} = fields
        
        if(
            !name ||
            !description ||
            !price ||
            !category  ||
            !stock 
        ){
            return res.send(400).json({
                error:"please include all files"
            })
        }

        //TODO:restricons on feild
        let product = new Product(fields)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
      //save to DB
      product.save((err,product)=>{
          if(err){
              res.status(400).json({
                  err:`saving oil is failed`
              })
          }
          res.json(product)
      })
    })
}

exports.getProduct = (req,res)=>{
   req.product.photo = undefined
   return res.json(req.product)
}

//middlewaare
exports.photo  = (req,res,next)=>{
    if(req.product.photo.data){
        // consoel.log(req.product)
        res.set("Content-Type",req.product.photo.contentType)
        console.log("came here to fetch data")
        return res.send(req.product.photo.data)
    }
    else{
        console.log("cannot find")
    }
    next();
}

exports.removeProduct = (req,res)=>{
  let product = req.product;
  product.remove((err,product)=>{
      if(err){
          return res.status(400).json({
              error:"Failed  to delete the product"
          })
      }
      res.json({
          message:"Deletion was successfyll"
      })
  })
}

exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
        //destructure the feilds
        // const {name,description,price,category,stock} = fields
        
        // if(
        //     !name ||
        //     !description ||
        //     !price ||
        //     !category  ||
        //     !stock 
        // ){
        //     return res.send(400).json({
        //         error:"please include all files"
        //     })
        // }

       //updating code
        let product = req.product;
        product = _.extend(product,fields)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
      //save to DB
      product.save((err,product)=>{
          if(err){
              res.status(400).json({
                  err:`saving oil is failed`
              })
          }
          res.json(product)
      })
    })
}

exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit)  : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"NO product found"
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req,res,next)=>{
    let myOpertions = req.body.order.product.map(prod =>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update : {$inc:{stock:-prod.count,sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"bulk operation failed"
            })
        }
    })
    next()
}

exports.getAllUniqueCategories  = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err || !category){
            return res.send(400).json({
                error:"No category found"
            })
        }
    })
}