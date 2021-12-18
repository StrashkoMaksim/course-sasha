const {Router} = require('express')
const AppealController = require('../controllers/appealController')
const {check, query} = require("express-validator")
const router = Router()

router.get(
    '/',
    AppealController.get
)

router.post(
    '/',
    [
        check('name', 'Отсутствует имя').exists(),
        check('email', 'Отсутствует тип').isEmail(),
        check('message', 'Отсутствует описание').exists(),
        check('petID', 'Отсутствует ID питомца').exists()
    ],
    AppealController.add
)

router.delete(
    '/',
    [
        query('_id', 'Отсутствует ID обращения').exists()
    ],
    AppealController.delete
)

module.exports = router