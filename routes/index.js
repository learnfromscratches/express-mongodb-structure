const express = require("express")

const router = express.Router()

const userRouetes = require("./userRoutes")
const productRoutes = require("./produtRoutes")
const imageRoutes = require("./imageRoutes")
const categoryRoutes = require("./categoryRoutes")
const cartRoutes = require("./cartRoutes")
const orderRoutes = require("./orderRoutes")

router.use(userRouetes, productRoutes, imageRoutes, categoryRoutes, cartRoutes, orderRoutes)
module.exports = router