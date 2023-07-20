const { Router } = require('express')
const { getCoins, getBalance, getCsv, getJson } = require('../controllers/index')
const router = Router();

router.get('/get_coins', getCoins)

router.post('/get_balance', getBalance)

router.post('/csv', getCsv)

router.post('/json', getJson)

module.exports = router;