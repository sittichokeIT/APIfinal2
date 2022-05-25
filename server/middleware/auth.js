const jwt = require('jsonwebtoken');
const user = require('../models/user_model')

const config = process.env;

const verifyToken = (req, res, next) => {
    //console.log(req)
    const token = req.body.token || req.query.token || req.header('auth-token');
    //console.log(token)
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    let decode = ''
    try {
        decode = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decode
        //console.log(req.user.UserID) 
        return req.user.UserID
        //next()
    } catch (e) {
        let UserID = req.body.UserID
        let token = null
        let data = {
            token: token
        }
        //console.log(token)
        user.findOneAndUpdate({ UserID }, { $set: data })
        .then(() => {
            //console.log(e)
            //res.header('auth-token', token).send("Token expires and create")
            return res.status(401).send()
        })
        .catch(err => {
            res.json({
                message: 'error'
            })
        })
        
    }
    //return res.status(200).send(req.user)
}

module.exports = {
    verifyToken
};
