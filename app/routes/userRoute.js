const express = require('express')
const { 
    getUsers, 
    getUser, 
    addUser, 
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
router.post('/signup', addUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router;
