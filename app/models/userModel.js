const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true
        },

        password: {
            type: String,
            minLength: 6
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

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// compare password from database
userSchema.methods.comparePassword = async function(pass, passDB) {
    return await bcrypt.compare(pass, passDB)
}

const User = mongoose.model('User', userSchema)

module.exports = User