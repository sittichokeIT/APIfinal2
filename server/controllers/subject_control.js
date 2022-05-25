const subject = require('../models/subject_model')
const register = require('../models/register_model')
const index = (req,res)=>{
    subject.find({},(err,subjects)=>{
        if(err) res.send(err)
        res.json(subjects)
    })
}

const createSubject = async (req,res) => {
    let subjects = new subject({
        SubjectID: req.body.SubjectID,
        SubjectName: req.body.SubjectName,
        SubjectRoom: req.body.SubjectRoom,
        SectionNo: req.body.SectionNo,
        StartTime: req.body.StartTime,
        EndTime: req.body.EndTime,
        Day: req.body.Day,
        MidtermDate: req.body.MidtermDate,
        FinalDate: req.body.FinalDate,
        Term: req.body.Term,
        Year: req.body.Year,
        UserID: req.body.UserID
    })
    let checkAll = await subject.findOne(
        {
            $and: [{
                UserID: subjects.UserID,
                SubjectName: subjects.SubjectName,
                SubjectRoom: subjects.SubjectRoom,
                SectionNo: subjects.SectionNo,
                StartTime: subjects.StartTime,
                EndTime: subjects.EndTime,
                Day: subjects.Day,
                MidtermDate: subjects.MidtermDate,
                FinalDate: subjects.FinalDate,
                Term: subjects.Term,
                Year: subjects.Year,               
            }]
        }
    )
    let checkRoom = await subject.find(
        {
            $and: [{
                SubjectRoom: req.body.SubjectRoom,
                StartTime: req.body.StartTime,
                EndTime: req.body.EndTime,
                Day: req.body.Day,
                Term: req.body.Term,
                Year: req.body.Year
            }]
        }
    )
    let checkSec = await subject.find(
        {
            $and: [{
                SubjectName: req.body.SubjectName,
                SectionNo: req.body.SectionNo,
                StartTime: req.body.StartTime,
                EndTime: req.body.EndTime,
                Day: req.body.Day,
                Term: req.body.Term,
                Year: req.body.Year
            }]
        }
    )
    if(checkAll&&checkRoom&&checkSec){
        res.json({
            message: 'No'
        })
    }
    else{
        subjects.save()
        .then(response => {
            res.json({
                message: 'Subject added Successfully!'
            })
        })
        .catch(err => {
            res.json({
                message: 'Subject added Error!'
            })
        }) 
    }
    
}

const DeleteSubject = async (req, res) => {
    let subjectID_ = req.body.SubjectID
    subject.findOneAndRemove({SubjectID: subjectID_})
    .then(() =>{
        res.json({
            message: `Delete subject id ${subjectID_} succeccfully!`
        })
    })
    .catch(err => {
        res.json({
            message: 'Delete subject Error'
        })
    })
}

const findbyUser = async (req,res) => {
    let UserID_ = req.body.UserID
    let Data = []
    await register.find({UserID: UserID_})
    .then(async subjects =>{
        console.log(subjects[0].SubjectID)
        for(let i=0;i<subjects.length;i++){
            Data[i] = await subject.findOne({
                SubjectID: subjects[i].SubjectID
            })
        }
        if(Data) res.json(Data)
    }).catch(err => {
        json.error(err)
    })
}                   


module.exports = {
    index,createSubject,DeleteSubject,findbyUser
}