const express = require('express')
const {
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articleController')
const router = express.Router()

router.get('/', getArticles)
router.get('/:id', getArticle)
router.post('/add', addArticle)
router.put('/update/:id', updateArticle)
router.delete('/delete/:id', deleteArticle)

module.exports = router 
