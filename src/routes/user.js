const router = require('express').Router()

const controller = require('../controllers/user.js')

router.get('/',controller.GET)
router.get('/:userId',controller.GET)

module.exports = router
