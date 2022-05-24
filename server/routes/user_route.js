const router = require('express').Router();
const usercontrol = require('../controllers/user_control')
const auth = require('../middleware/auth')

router.get('/',usercontrol.index)
router.post('/createStudent',usercontrol.createStudent)
router.post('/createTeacher',usercontrol.createTeacher)
router.post('/createLeader',usercontrol.createLeader)
router.post('/deleteuser',usercontrol.DeleteUser)
router.post('/login',usercontrol.login)
router.post('/test', auth.verifyToken)

module.exports = router