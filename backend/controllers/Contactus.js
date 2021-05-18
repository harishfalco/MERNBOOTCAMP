const {Contactus} = require("../models/Contactus")

const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs");
const { isBuffer, sortBy } = require("lodash");

exports.saveMessage = (req,res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    
    form.parse(req,(err,fields)=>{
        if(err || !fields){
            return res.status(400).json({
                error:"cannot insert data"
            })
        }
        const {name,email,description} = fields;
        if(
            !name ||
            !email ||
            ! description 
        )
        {
          return res.send(400).json({
            error:"Include all the details"
           }) 
        }

        let Message = new Contactus(fields)

        Message.save((err,message)=>{
            if(err || !message){
                return res.send(400).json({
                    err:"Saving is failed"
                })
            }
            res.json(message)
        })
    })
}