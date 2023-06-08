const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        articleImage: {
            type: String,
            required: false
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
            maxLength: 255
        }
    },
    {
        timestamps: true
    }
)

const Article = mongoose.model('Article', articleSchema)

module.exports = Article