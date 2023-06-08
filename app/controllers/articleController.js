const Article = require('../models/articleModel')

const getArticles = async (req, res) => {
    try {
        const articles = await Article.find(req.body)
        res.status(200).json(articles)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const getArticle = async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findById(id, req.body)
        res.status(200).json(article)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message}) 
    }
}

const addArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body)
        res.status(200).json(article)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findByIdAndUpdate(id, req.body)
        if (!article) {
            return res.status(404).json({message: 'cannot find this user'})
        }
        
        const update = await Article.findById(id)
        res.status(200).json(update)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findByIdAndDelete(id)
        if (!article) {
            return res.status(404).json({message: 'cannot find this user'})
        }
        
        res.status(200).json({message: 'data was deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message}) 
    }
}

module.exports = {
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle
}