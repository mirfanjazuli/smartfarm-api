const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 3000

const User = require('./models/userModel')
const Article = require('./models/articleModel')

app.use(express.json())

// configure dotenv
// dotenv.config()

// connect to database
require('./database/db')

// const appendUrl = (url) => `${$VERSION_API}${url}`


// import routes
// const userRoute = require('./app/routes/userRoute');

// app.use('/profile', userRoute)

// routes
app.get('/', (req, res) => {
  res.send('this is homepage!')
})

// endpoint
const userRoute = require('./routes/userRoute')
const articleRoute = require('./routes/articleRoute')

// routers
app.use('api/v1/users', userRoute)
app.use('api/v1/articles', articleRoute)

// app.post('/signup', async(req, res) => {
//   try {
//     const user = await User.create(req.body)
//     res.status(200).json(user)
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).json({message: error.message})
//   }
// })


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})


