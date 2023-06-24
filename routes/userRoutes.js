const express = require("express");
const User = require("../db/model/userModel")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.use(express.json());
const checkToken = require("../utils")

router.get("/user", async (req, res) => {
  const user = await User.find();
  res.status(200).send(user)
});
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).send(user)
})

router.post("/sign-up", async (req, res) => {
  try {
    const userData = { ...req.body }
    if (userData.password != userData.confirmPassword) {
      return res.status(401).send({ error: "Password doesn't match" })
    }
    const saltRounds = 2
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    return res.status(201).send(`New user create succesfuly. Here is the details of the user ${user}`);
  } catch (e) {
    return res.status(404).send({ error: e })
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    if (!user) {
      return res.status(401).send({ message: "User not found" })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).send({ message: "Username or password does not match" })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)

    return res.status(200).send({ message: "Logged in succesfuly", token : token })
  } catch (e) {
    res.status(404).send({ error: e, message: "Cannot login" })
  }
})

router.patch("/user/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
  res.status(200).send("User data updated succesfuly.")
})
router.delete('/user/:id', async (req, res) => {
  const name = await User.findOne({ _id: req.params.id })
  res.status(200).send(`Succesfuly deleted the user ${name.name} from the database`)
  const user = await User.deleteOne({ _id: req.params.id })
})

module.exports = router;