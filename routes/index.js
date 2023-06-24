const express = require("express")

const router = express.Router()

const userRouetes = require("./userRoutes")
const productRoutes = require("./produtRoutes")
const imageRoutes = require("./imageRoutes")
const categoryRoutes = require("./categoryRoutes")

router.use(userRouetes, productRoutes, imageRoutes, categoryRoutes)
module.exports = router