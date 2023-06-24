const express = require("express")
const Category = require("../db/model/categoryModel")
const router = express.Router()

router.get('/category',async(req,res)=>{
    const category = await Category.find()
    res.status(200).send(category)
})
router.post('/category',async(req,res)=>{
    try{
        const category = new Category({...req.body})
        await category.save()
        res.status(201).send(category)
    }catch(e){
        res.status(404).send({error : e})
    }
})
router.patch('/category/:id', (req,res)=>{
    const category = Category.findByIdAndUpdate(req.params.id, {...req.body})
})

router.delete('/category/:id',(req,res)=>{
    const category = Category.findByIdAndDelete(req.params.id)
})

module.exports = router
