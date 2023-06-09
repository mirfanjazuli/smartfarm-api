const express = require('express')
const { 
    getUsers, 
    getUser, 
    signUp,
    signIn,
    updateUser,
    deleteUser 
} = require('../controllers/userController')

const router = express.Router()

// sign up and sign in router
router.post('/signup', signUp)
router.post('/signin', signIn)

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;
