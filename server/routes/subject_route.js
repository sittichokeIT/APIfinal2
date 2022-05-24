const router = require('express').Router()
const subjectcontrol = require('../controllers/subject_control')

router.get('/',subjectcontrol.index)
router.post('/createSubject',subjectcontrol.createSubject)
router.post('/deleteSubject',subjectcontrol.DeleteSubject)

module.exports = router