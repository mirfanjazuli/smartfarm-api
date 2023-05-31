const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            uniqe: true,
            required: true
        },

        password: {
            type: String,
            maxLength: 255
        },

        imageUrl: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User