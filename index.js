const express = require('express')
const app = express()
const port = 3000
const User = require('./app/models/userModel')

app.use(express.json())

// connect to database
require('./app/database/smartfarm')

const appendUrl = (url) => `${$VERSION_API}${url}`


// import routes
const userRoute = require('./app/routes/userRoute');

app.use('/profile', userRoute)

// routes
app.get('/', (req, res) => {
  res.send('this is homepage!')
})

app.post('/signup', async(req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;

