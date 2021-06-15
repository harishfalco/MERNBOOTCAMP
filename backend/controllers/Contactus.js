const Contactus = require("../models/Contactus")

// const formidable = require("formidable")
// const _ = require("lodash")

exports.saveMessage = (req,res)=>{
    console.log("the request in contact page: "+req)
    
    // let form = new formidable.IncomingForm()
    // form.keepExtensions = true;
    
    // form.parse(req,(err,fields)=>{
    //     console.log("came in")
    //     if(err || !fields){
    //         return res.status(500).json({
    //             error:"cannot insert data"
    //         })
    //     }
        
    //     const {name,email,description} = fields;
    //     if(
    //         !name ||
    //         !email ||
    //         !description 
    //     )
    //     {
    //     console.log("got an error on controller: ") 
    //       return res.send(403).json({
    //         error:"Include all the details"
    //        }) 
    //     }

    //     let Message = new Contactus(fields)

    //     Message.save((err,message)=>{
    //         if(err || !message){
    //             console.log("got an error on controller , while saving: ",err)
    //             return res.send(400).json({
    //                 err:"Saving is failed"
    //             })
    //         }
    //         res.json(message)
    //     })
    // })
    const contactInfo = new Contactus(req.body)
    contactInfo.save((err,message)=>{
        if(err || !message){
            return res.status(500).json({
                error:"not able to save contactus"
            })
        }
       res.json({message})
    })
}