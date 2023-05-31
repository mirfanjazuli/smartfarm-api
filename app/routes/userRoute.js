const express = require('express')
const route = express.Router()

route.get('/', (req, res) => {
    res.json({message: 'This is profile!'})
})

module.exports = route;
