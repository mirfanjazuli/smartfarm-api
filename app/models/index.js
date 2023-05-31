const dbConfig = require('../database/smartfarm')
const mongoose = require('mongoose')

module.exports = {
    mongoose,
    url: dbConfig.url,
    User: require('./userModel')(mongoose)
}