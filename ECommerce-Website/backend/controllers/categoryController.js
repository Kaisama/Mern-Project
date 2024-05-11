import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory=asyncHandler(async(req,res)=>{
    try {
        const {name}=req.body
        
        if(!name){
            return res.status(400).json({message:"Please provide a valid category name."})
        }

        const existingCategory=await Category.findOne({name});

        if(existingCategory){
            return res.status(400).json({message:"Category already exists."})
        }

        const category=await new Category({name}).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
    try {
        const{name}=req.body;
        const {categoryId}=req.params

        const category=await Category.findOne({_id:categoryId})

        if(!category){
            return res.status(500).json({error:"Category not found"})
        }

        category.name=name

        const updatedCategory=await category.save()
        res.json(updatedCategory)
        
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})

const deleteCategory=asyncHandler(async(req,res)=>{
try {
    const removed=await Category.findByIdAndDelete(req.params.categoryId)
    res.json(removed)
} catch (error) {
    res.status(500).json({error:"Internal server error"})
}
})

export{createCategory,updateCategory,deleteCategory}