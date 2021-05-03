const Category = require("../models/category")


exports.getCategoryById = (req,res,next,id)=>{
   Category.findById(id).exce((err,cate)=>{
       if(err){
           return res.status(400).json({
               error:"category not found"
           })
       }
       req.category = cate;
       next()
   }
   )  
}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body)
    category.save((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"not able to save category"
            })
        }
        res.json({category})
    })
};

exports.getCategory = (req,res)=>{
    return res.json(req.category)
};


exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error:"not able to find category"
            })
        }
        res.json(items);
    })
};


exports.updateCategory = (req,res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"failed to update the category"
            })
        }
        res.json(updatedCategory)
    })

}

exports.removeCategory = (req,res)=>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"failed to delete the category"
            })
        }
        res.json({
            message:"Successfully deleted "
        });
    })
}