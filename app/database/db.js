const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

// uri = 'mongodb+srv://root:1234@smartfarm.rupxzav.mongodb.net/?retryWrites=true&w=majority' 

// const connectDB = () => {
//     console.log('connect db')
//     return mongoose.connect(process.env.MONGODB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => console.log('Database connected'))
//     .catch((error) => console.log(error.message))
// }

// module.exports = connect

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    })
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error.message))
    

// module.exports = {
//     url: 'localhost://mongodb:27017/smartfarm'
// }

