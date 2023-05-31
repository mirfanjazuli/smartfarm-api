const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://root:1234@smartfarm.rupxzav.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error.message))

// module.exports = {
//     url: 'localhost://mongodb:27017/smartfarm'
// }

