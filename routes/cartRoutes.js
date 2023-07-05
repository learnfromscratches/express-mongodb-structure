const express = require("express")
const router = express.Router()
const Cart = require("../db/model/cartModel")

router.get('/cart', async (req, res) => {
    try {
        const cart = await Cart.find()
        if (cart) {
            res.status(200).send(cart)
        }
        else {
            res.status(404).send({ message: "Cart is empty" })
        }
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.get('/cart/:id', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id })
        if (cart) {
            res.status(200).send(cart)
        } else {
            res.status(401).send({ message: "Bad request. Please enter valid id" })
        }
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.patch('/cart/:id', async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.id })
    if (cart) {
        cart.items.push(req.body.product)
        cart.save()
    } else {
        const cart = Cart({ userId: req.params.id, items: [req.body.product] })
        cart.save()
    }
    return res.status(200).send(cart)
}
)

// router.patch('/cart/:id', async (req, res) => {
//     try {
//         const cart = await Cart.findByIdAndUpdate(req.params.id, { ...req.body })
//         res.status(200).send(cart)
//     } catch (e) {
//         res.status(404).send({ error: e })
//     }
// })
router.post('/cart/delete/:id', async (req, res) => {
    try {
        // console.log(req.body.product)
        const cart = await Cart.findOne({ userId: req.params.id })
        // console.log("cart is",cart)
        const items = cart.items.filter(item => item._id != req.body.product)
        console.log("items are",items)
        cart.items = items
        cart.save()
        res.status(200).send({ message: 'Cart deleted succesfuly' })
    } catch (e) {
        res.status(404).send({ error: e })
    }
})

module.exports = router;