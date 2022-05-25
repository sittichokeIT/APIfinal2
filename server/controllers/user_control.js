const { response } = require('express')
const user = require('../models/user_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

const index = (req,res,next)=>{
    user.find({},(err,users) =>{
        if(err) res.send(err)
        res.json(users)
    })
}

const createStudent = async (req, res) => {
    let Password = await bcrypt.hash(req.body.password, 10)
    let users = await user({
        UserID: req.body.UserID,
        status: "Student",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: Password,
        address: req.body.address,
        telno: req.body.telno,
    })
    users.save()
        .then(response => {
            res.json({
                message: 'Student added Successfully!'
            })
        })
        .catch(err => {
            res.json({
                message: 'Student added Error!'
            })
        })
}

const createTeacher = async (req, res) => {
    let Password = await bcrypt.hash(req.body.password, 10)
    let users = new user({
        UserID: req.body.UserID,
        status: "Teacher",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: Password,
        address: req.body.address,
        telno: req.body.telno,
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

const createLeader = async (req, res) => {
    let Password = await bcrypt.hash(req.body.password, 10)
    let users = new user({
        UserID: req.body.UserID,
        status: "Leader",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: Password,
        address: req.body.address,
        telno: req.body.telno,
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

const login = async (req, res, next) => {
    // console.log(req)
    let userSearch = await user.findOne({ UserID: req.body.UserID })
    if (userSearch) {
        console.log(userSearch.password)
        let Passwordcheck = await bcrypt.compare(req.body.password, userSearch.password)
        if (Passwordcheck) {
            let UserID = req.body.UserID
            let token = jwt.sign(
                { UserID: user._id, UserID },
                process.env.TOKEN_KEY,
                { expiresIn: "1h" }
            )
            let data = {
                token: token
            }
            //console.log(token)
            req.body.token = token
            user.findOneAndUpdate({ UserID }, { $set: data })
            .then(() => {
                let status = userSearch.status
                // res.json({
                //     message: status
                // })
                let id = auth.verifyToken(req, res)
                //console.log(id)
                res.status(200).json({
                    message: status,
                    auth_token: token,
                    UserID: id
                })
            })
            .catch(err => {
                res.json({
                    message: 'error'
                })
            })
        }else {
            res.json({
                message: "Login fail"
            })
        }
    }else{
        res.json({
            message: "User not found"
        })
    }
}

const editPassword = async (req, res) => {
    let UserID = req.body.UserID
    let Password = await bcrypt.hash(req.body.password, 10)
    let data = {
        password: Password
    }
    user.findOneAndUpdate({ UserID }, { $set: data })
        .then(() => {
            res.json({
                message: 'Password updated Successfully'
            })
        })
        .catch(err => {
            res.json({
                message: 'error'
            })
        })
}

module.exports = {
    index,createStudent,createTeacher,createLeader,DeleteUser,login,editPassword
}