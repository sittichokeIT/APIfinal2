const { response } = require('express')
const user = require('../models/user_model')

const index = (req,res,next)=>{
    user.find({},(err,users) =>{
        if(err) res.send(err)
        res.json(users)
    })
}

const createStudent = async (req,res) => {
    let users = await user({
        UserID: req.body.UserID,
        status: "Student",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        telno: req.body.telno
    })
    users.save()
    .then(response => {
        res.json({
            message: 'Student added Successfully!!'
        })
    })
    .catch(err => {
        res.json({
            message: 'Student added Error!'
        })
    })
}

const createTeacher = (req,res) => {
    let users = new user({
        UserID: req.body.UserID,
        status: "Teacher",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        telno: req.body.telno
    })
    users.save()
    .then(response => {
        res.json({
            message: 'Teacher added Successfully!'
        })
    })
    .catch(err => {
        res.json({
            message: 'Teacher added Error!'
        })
    })
}

const createLeader = (req,res) => {
    let users = new user({
        UserID: req.body.UserID,
        status: "Leader",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        telno: req.body.telno
    })
    users.save()
    .then(response => {
        res.json({
            message: 'Leader added Successfully!'
        })
    })
    .catch(err => {
        res.json({
            message: 'Leader added Error!'
        })
    })
}

const DeleteUser = async (req,res) => {
    let userID = req.body.UserID
    user.findOneAndRemove({UserID: userID})
    .then(() =>{
        res.json({
            message: `Delete user id ${userID} Successfully!`
        })
    })
    .catch(err =>{
        res.json({
            message: 'Delete error!'
        })
    })
}

module.exports = {
    index,createStudent,createTeacher,createLeader,DeleteUser
}