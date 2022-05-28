const router = require('express').Router();
const usercontrol = require('../controllers/user_control')
const auth = require('../middleware/auth')

router.get('/',usercontrol.index)
router.post('/createUser',usercontrol.createUser)
router.post('/deleteuser',usercontrol.DeleteUser)
router.post('/login',usercontrol.login)
router.post('/verify', auth.verifyToken)

module.exports = router