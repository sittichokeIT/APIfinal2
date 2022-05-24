const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
    SectionID: {type: String, required: false},
    SectionNo: {type: String, required: false},
    StartTime: {type: String, required: false},
    EndTime: {type: String, required: false},
    Day: {type: String, required: false},
    MidtermDate: {type: String, required: false},
    FinalDate: {type: String, required: false},
    // UserID: {type: String, required: false}
}, {collection: 'Sections'})

module.exports = mongoose.model('sectionSchema', sectionSchema)