const User = require('../models/userModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')

const getUsers = async (req, res) => {
    try {
        const users = await User.find(req.body)
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id, req.body)
        res.status(200).json(user)
    } catch (error) {   
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

// authentication and authorization
const signUp = asyncErrorHandler(async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        
        const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
            expiresIn: process.env.LOGIN_EXP
        })

        res.status(201).json({
            status: 'success',
            token,
            data: {
                newUser
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

const signIn = asyncErrorHandler(async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    // const { email, password } = req.body

    // if (!email || !password)
})

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, req.body)
        if (!user) {
            return res.status(404).json({message: 'cannot find this user'})
        }
        
        const update = await User.findById(id)
        res.status(200).json(update)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({message: 'cannot find this user'})
        }
        
        res.status(200).json({message: 'data was deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message}) 
    }
}

module.exports = { 
    getUsers, 
    getUser, 
    signUp, 
    updateUser, 
    deleteUser 
}