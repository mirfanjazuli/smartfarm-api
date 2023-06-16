const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const PORT = process.env.PORT || 3000

const User = require('./models/userModel')
const Article = require('./models/articleModel')

app.use(express.json())

// connect to database
require('./database/db')

// routes
app.get('/', (req, res) => {
  res.send('this is homepage!')
})

// endpoint
const userRoute = require('./routes/userRoute')
const articleRoute = require('./routes/articleRoute')

// routers
app.use('/api/v1/users', userRoute)
app.use('/api/v1/articles', articleRoute)

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})


