require(global.__rootDir + '/models/stores')
const router = require('express').Router()
const controllers = require(global.__rootDir + '/controllers/stores/store_controllers')

router.get('/', controllers.storeList)
router.get('/:name', controllers.storeDetail)

module.exports = router
