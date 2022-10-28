const express = require("express");

const router = express.Router()
const User = require("../models/user")

// getting all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// getting one user
router.get('/:id', findUser, (req, res) => {
    res.json(res.user)
})
// Creating user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })

    try {
        const newUser = await user.save()
        res.status(201).json({ newUser })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Updating user
router.patch('/:id', findUser, (req, res) => {

})
//Deleting user
router.delete('/:id', findUser, async (req, res) => {
    try {
        await res.user.remove()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create a middleware to find user
async function findUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user

    next()
}

module.exports = router