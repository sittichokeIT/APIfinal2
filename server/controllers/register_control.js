const register = require('../models/register_model')
const subject = require('../models/subject_model')
const createRegister = async (req,res) => {
    let registers = new register({
        UserID: req.body.UserID,
        SubjectID: req.body.SubjectID,
        SectionNo: req.body.SectionNo
    })
    let check = await register.findOne(
        {
            $and: [{
                UserID: registers.UserID,
                SubjectID: registers.SubjectID
            }]
        }
    )
    let checkSec = await subject.findOne(
        {
            $and: [{
                SubjectID: registers.SubjectID,
                SectionNo: registers.SectionNo
            }]
        }
    )
    if(checkSec){
        if(check){
            res.json({message: "no"})
        }
        else{
            registers.save()
            .then(response => {
                res.json({
                    message: 'Register Successfully!'
                })
            })
            .catch(err => {
                res.json({
                    message: 'Register Failure!'
                })
            })
        } 
    }
    else{
        res.json({
            message: 'No'
        })
    }
    
} 

const UpdateRegister = async (req,res) => {
    let UserID_ = req.body.UserID
    let SubjectID_ = req.body.SubjectID
    let SectionOld_ = req.body.SectionOld
    let SectionNew_ = req.body.SectionNew
    console.log(UserID_,SubjectID_,SectionNew_,SectionOld_)
    let checknewSec = await subject.findOne(
        {
            $and: [{
                SubjectID: SubjectID_,
                SectionNo: SectionNew_
            }]
        }
    )
    if(checknewSec){
        register.findOneAndUpdate({UserID: UserID_}, {$set:{SectionNo: SectionNew_}}, {new: true})
        .then(() =>{
            res.json({
                message: `Update section of user id ${UserID_} from section ${SectionOld_} to section ${SectionNew_}`
            })
        })
        .catch(err => {
            res.json({
                message: 'Update Failure!'
            })
        })
    }
    else{
        res.json({
            message: `Do not have section ${SectionNew_}`
        })
    }
}

const DeleteRegister = async (req,res) => {
    let UserID_ = req.body.UserID
    let SubjectID_ = req.body.SubjectID
    let SectionNo = req.body.SectionNo
    await register.findOneAndRemove(
        {
            $and: [{
                UserID: UserID_,
                SubjectID: SubjectID_,
                SectionNo: SectionNo
            }]
        }  
    )
    .then(() => {
        res.json({
            message: `Delete Register Successfully!`
        })
    })
    .catch(err => {
        res.json({
            message: 'Delete Failure!'
        })
    })
}

const findtermandyear = async (req, res) => {
    let UserID_ = req.body.UserID
    let term_ = req.body.Term
    let year_ = req.body.year
    let Data = []
    await register.find({UserID: UserID_})
    .then(async subjects => {
        for(let i=0;i<subjects.length;i++){
            Data[i] = await subject.findOne({
                $and: [{
                    SubjectID: subjects[i].SubjectID,
                    SectionNo: subjects[i].SectionNo,
                    Term: term_,
                    Year: year_
                }]
            })
        }
        //console.log(Data[0])
        if(Data[0] != null) res.json(Data)
        else res.json({ message: "Error" })
    }).catch(err =>{
        console.log(err)
    })
}

module.exports = {
    createRegister,UpdateRegister,DeleteRegister,findtermandyear
}