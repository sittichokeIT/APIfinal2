const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    SubjectID: { type: String, required: false },
    SubjectName: { type: String, required: false },
    SubjectRoom: { type: String, required: false },
    SectionNo: {type: String, required: false},
    StartTime: {type: String, required: false},
    EndTime: {type: String, required: false},
    Day: {type: String, required: false},
    MidtermDate: {type: String, required: false},
    FinalDate: {type: String, required: false},
    Term: { type: String, required: false},
    Year: { type: String, required: false},
    UserID: { type: String, required: false }
}, {collection: 'Subject'})

module.exports = mongoose.model('subjectSchema', subjectSchema)