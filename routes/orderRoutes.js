const express = require("express")
const router = express.Router()
const Orders = require("../db/model/orderModel")

router.get('/order', async (req, res) => {
    try {
        const orders = await Orders.find()
        res.status(200).send(orders)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.get('/order/:id', async (req, res) => {
    try {
        const orders = await Orders.findById(req.param.id)
        if (orders) {
            res.status(200).send(orders)
        } else {
            res.status(401).send({ message: "Bad request. Please enter valid id" })
        }
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.post('/order', async (req, res) => {
    try {
        const orders = new Orders({ ...req.body })
        await orders.save()
        res.status(201).send({ message: "Cart updated succesfuly" })
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.patch('/order/:id', async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.params.id, { ...req.body })
        res.status(200).send(order)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.delete('/order/:id', async (req, res) => {
    try {
        const order = Orders.findByIdAndDelete(req.params.id)
        res.status(200).send("Order deleted succesfuly")
    } catch (e) {
        res.status(404).send({ error: e })
    }
})

module.exports = router;