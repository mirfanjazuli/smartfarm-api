const express = require('express')
const { 
    getUsers, 
    getUser, 
    signUp, 
    updateUser,
    deleteUser 
} = require('../controllers/userController')
const router = express.Router()
// const userController = require('../controllers/userController')

// router.get('/', (req, res) => {
//     res.json({message: 'This is profile!'})
// })

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/signup', signUp)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;
