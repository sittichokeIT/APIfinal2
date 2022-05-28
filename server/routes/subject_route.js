const router = require('express').Router()
const subjectcontrol = require('../controllers/subject_control')

router.get('/',subjectcontrol.index)
router.post('/createSubject',subjectcontrol.createSubject)
router.post('/deleteSubject',subjectcontrol.DeleteSubject)
router.post('/findtest',subjectcontrol.findbyUser)
router.post('/findteach',subjectcontrol.findTeachbyUser)
router.post('/findSec',subjectcontrol.findSec)
router.post('/getStudent',subjectcontrol.getStudent)

module.exports = router