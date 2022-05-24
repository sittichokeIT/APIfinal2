const section = require('../models/section_model')

const createSection = (req,res) =>{
    let sections = new section({
        SectionID: req.body.SectionID,
        SectionNo: req.body.SectionNo,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        Day: req.body.Day,
        MidtermDate: req.body.MidtermDate,
        FinalDate: req.body.FinalDate
    })
    sections.save()
    .then(response => {
        res.json({
            message: 'Section added Successfully!'
        })
    })
    .catch(err => {
        res.json({
            message: 'Section added Error!'
        })
    })
}

module.exports = {
    createSection
}