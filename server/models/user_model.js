const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    UserID: { type: String, required: false },
    status: {type: String, required: false },
    firstname: { type: String, required: false },
    lastname: { tpye: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    address: { type: String, required: false },
    telno: { type: String, required: false }
}, { collection: 'Users' })

module.exports = mongoose.model('userSchema', userSchema)