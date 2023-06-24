const express = require("express")
const Product = require("../db/model/productModel")
const router = express.Router()

router.use(express.json())
const checkToken = require("../utils")

router.get('/product', checkToken,async (req, res) => {
    try {
        const { sortKey, sortValue, brand, title, maxPrice, minPrice, page, limit } = req.query;
        const query = {}
        if (brand) query.brand = brand
        if (title) query.title = title
        if (maxPrice | minPrice) query.price = { $lte: maxPrice, $gte: minPrice }

        const product = await Product.find(query)
            .populate("seller")
            .populate("category")
            .sort({ [sortKey]: sortValue })
            .limit(limit)
            .skip((page - 1) * limit)
        res.status(200).send({ data: product, message: "Products fetched succesfuly" })
    } catch (e) {
        console.log(e)
        res.status(404).send({ error: e })
    }
})

//Get product using aggreegate instead of find() funtion

router.get('/product/aggregate', async(req,res)=>{
    const products = await Product.aggregate(
        [
            // { $match : {brand :"HP"}},
            // { $project : {title : 1, price : 1,description : 1, _id : 0}},
            // { $group : { _id : $brand , total : {sum : 1}}},
            // { $sort : {brand : -1}}
            {
                $lookup : {
                    from : "categories", // Category ---> categories changed Category name to lowercase
                    localField : "category", //category name in product schema
                    foreignField : "_id", //referring to the value in the product schema
                    as : "categoryData", //Field name to show the category data with product
                }
            }
        ]
    )
    res.status(200).send(products)
})

router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).send(product)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.post('/product', async (req, res) => {
    const product = Product({ ...req.body })
    await product.save()
    res.status(201).send(product)
})
router.patch('/product/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.status(200).send(product)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.delete('/product', (req, res) => {
    try {
        const product = Product.findByIdAndDelete(req.params.id)
        res.status(200).send("Product deleted succesfuly")
    } catch (e) {
        res.status(404).send({ error: e })
    }
})

module.exports = router;