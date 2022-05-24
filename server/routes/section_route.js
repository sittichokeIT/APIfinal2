const router = require('express').Router()
const sectioncontrol = require('../controllers/section_control')

router.post('/createSection', sectioncontrol.createSection)

module.exports = router