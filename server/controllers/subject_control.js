const subject = require('../models/subject_model')
const register = require('../models/register_model')
const user = require('../models/user_model')

const index = (req, res) => {
    subject.find({}, (err, subjects) => {
        if (err) res.send(err)
        res.json(subjects)
    })
}

const createSubject = async (req, res) => {
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
    if (checkAll && checkRoom && checkSec) {
        res.json({
            message: 'No'
        })
    }
    else {
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
    subject.findOneAndRemove({ SubjectID: subjectID_ })
        .then(() => {
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

const findbyUser = async (req, res) => {
    let UserID_ = req.body.UserID
    let Data = []
    await register.find({ UserID: UserID_ })
        .then(async subjects => {
            //console.log(subjects[0].SubjectID)
            for (let i = 0; i < subjects.length; i++) {
                Data[i] = await subject.findOne({
                    SubjectID: subjects[i].SubjectID
                })
            }
            if (Data) res.json(Data)
        }).catch(err => {
            json.error(err)
        })
}

const findTeachbyUser = async (req, res) => {
    //console.log(req.body)
    let _UserID = req.body.UserID
    let _term = req.body.Term
    let _year = req.body.year
    //console.log(_UserID + " " + _term + " " + _year)
    await register.find({ UserID: _UserID })
        .then(async () => {
            console.log(_UserID + " " + _term + " " + _year)
            Data = await subject.find({
                $and: [{
                    UserID: _UserID,
                    Term: _term,
                    Year: _year
                }]
            }) 
            console.log(await subject.find({
                $and: [{
                    UserID: _UserID,
                    Term: _term,
                    Year: _year
                }]
            }) );
            if (Data.length > 0) res.json(Data)
            else res.json({ message: "Error" })
        }).catch(err => {
            json.error(err)
        })
}

const findSec = async (req, res) => {
    let _UserID = req.body.UserID
    let _term = req.body.Term
    let _year = req.body.year
    let _SubjectID = req.body.SubjectID
    await register.find({ UserID: _UserID})
    .then(async () => {
        Data = await subject.find({
            $and: [{
                UserID: _UserID,
                Term: _term,
                Year: _year,
                SubjectID: _SubjectID
            }]
        })
        //console.log(Data.length);
        if (Data.length > 0) res.json(Data)
        else res.json({ message: "Error" })
    }).catch(err => {
        json.error(err)
    })
}

const getStudent = async (req, res) => {
    let _SubjectID = req.body.SubjectID
    let _Sec = req.body.SectionNo
    await register.find({ SubjectID: _SubjectID })
    .then(async () => {
        Data = await register.find({
            $and: [{
                SubjectID: _SubjectID,
                SectionNo: _Sec
            }]
        })
        //console.log(Data)
        if (Data.length > 0) res.json(Data)
        else res.json({ message: "Error" })
    }).catch(err => {
        //console.log(err);
        json.error(err)
    })
}


module.exports = {
    index, createSubject, DeleteSubject, findbyUser, findTeachbyUser, findSec, getStudent
}