const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const mongoose = require('mongoose')

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXP 
    })
}

const getUsers = async (req, res, next) => {
    const { headers } = req
    const token = headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'please login to get all users!'
        })
        return next()
    }
    const tokenSplit = token.split(' ')[1]
    try {
        const verify = jwt.decode(tokenSplit)
        if(verify) {
            const userId = await User.findOne({_id: new mongoose.Types.ObjectId(verify)})
            if(!userId) {
                res.status(401).json({
                    message: 'token incorrect so we cant found account on our database!'
                })
                return next()
            }
            const users = await User.find({})
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(401).json({
            message: 'incorrect or expired token!'
        })
        return next()
    }
}

const getUser = async (req, res, next) => {
    const { headers } = req
    const token = headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'please login to get user by id!'
        })
        return next()
    }
    const tokenSplit = token.split(' ')[1]
    try {
        const verify = jwt.decode(tokenSplit)
        if(verify) {
            const userId = await User.findOne({_id: new mongoose.Types.ObjectId(verify)})
            if(!userId) {
                res.status(401).json({
                    message: 'token incorrect so we cant found account on our database!'
                })
                return next()
            }
            const { id } = req.params
            const user = await User.findById(id, req.body)
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(401).json({
            message: 'incorrect or expired token!'
        })
        return next()
    }
}

// authentication and authorization
const signUp = asyncErrorHandler(async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        
        const token = signToken(newUser._id)

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
    try { 
        const email = req.body.email
        const password = req.body.password
    
        if (!email) {
            res.status(400).json({
                message: 'please provide email!'
            })
            return next()
        }

        if (!password) {
            res.status(400).json({
                message: 'please provide password!'
            })
            return next()
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({
                message: 'email not found!'
            })
            return next()   
        }

        if (!(await user.comparePassword(password, user.password))) {
            res.status(400).json({
                message: 'incorrect password!'
            })
            return next()   
        }

        const token = signToken(user._id)
        res.setHeader('Authorization', 'Bearer ' + token)
        res.status(200).json({
            status: 'success',
            token
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message}) 
    }
})

const updateUser = async (req, res) => {
    const { headers } = req
    const token = headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'please login to get all users!'
        })
        return next()
    }
    const tokenSplit = token.split(' ')[1]
    try {
        const verify = jwt.decode(tokenSplit)
        if(verify) {
            const userId = await User.findOne({_id: new mongoose.Types.ObjectId(verify)})
            if(!userId) {
                res.status(401).json({
                    message: 'token incorrect so we cant found account on our database!'
                })
                return next()
            }
            const { id } = req.params
            const user = await User.findByIdAndUpdate(id, req.body)
            if (!user) {
                return res.status(404).json({message: 'cannot find this user'})
            }
            
            const update = await User.findById(id)
            res.status(200).json(update)
        }
    } catch (error) {
        res.status(401).json({
            message: 'incorrect or expired token!'
        })
        return next()
    }
}

const deleteUser = async (req, res) => {
    const { headers } = req
    const token = headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'please login to get all users!'
        })
        return next()
    }
    const tokenSplit = token.split(' ')[1]
    try {
        const verify = jwt.decode(tokenSplit)
        if(verify) {
            const userId = await User.findOne({_id: new mongoose.Types.ObjectId(verify)})
            if(!userId) {
                res.status(401).json({
                    message: 'token incorrect so we cant found account on our database!'
                })
                return next()
            }
            const { id } = req.params
            const user = await User.findByIdAndDelete(id)
            if (!user) {
                return res.status(404).json({message: 'cannot find this user'})
            }
            
            res.status(200).json({message: 'data was deleted successfully'})
        }
    } catch (error) {
        res.status(401).json({
            message: 'incorrect or expired token!'
        })
        return next()
    }
}

module.exports = { 
    getUsers, 
    getUser, 
    signUp, 
    signIn,
    updateUser, 
    deleteUser 
}