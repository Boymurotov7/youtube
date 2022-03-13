const router = require('express').Router()
const controller = require('../controllers/auth.js')
const { regValidation } = require('../middlewares/validation.js')

router.get('/login',controller.LOGIN)
router.get('/register',regValidation,controller.REGISTER)

module.exports = router