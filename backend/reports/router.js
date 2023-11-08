const {Router} = require('express')
const controller = require('./controller')
const router = Router()

router.get('/excessReport', controller.getExcessReport);

module.exports = router