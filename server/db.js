const mongoose = require('mongoose')

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        mongoose.connect(process.env.DB, connectionParams)
        console.log("Connected to database succeccfully")
    }catch (err) {
        console.error(err)
    }
}