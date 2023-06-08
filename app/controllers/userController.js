const User = require('../models/userModel')

const getUsers = async (req, res) => {
    res.status(200).json({message: 'get user profile'})
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

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

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
    addUser, 
    updateUser, 
    deleteUser 
}