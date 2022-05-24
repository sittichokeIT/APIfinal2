const router = require('express').Router()
const registercontrol = require('../controllers/register_control')

router.post('/',registercontrol.createRegister)
router.post('/updateRegis',registercontrol.UpdateRegister)
router.post('/deleteRegis',registercontrol.DeleteRegister)

module.exports = router