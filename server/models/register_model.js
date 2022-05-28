const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    UserID: { type: String, required: false},
    Name: { type: String, required: false},
    SubjectID: { type: String, required: false},
    SectionNo: { type: String, required: false}
}, {collection: 'Registers'})

module.exports = mongoose.model('registerSchema', registerSchema)