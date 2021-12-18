const {Router} = require('express')
const {check, query} = require('express-validator')
const router = Router()
const PetController = require('../controllers/petController')

router.get(
    '/',
    PetController.getAll
)

router.get(
    '/few',
    PetController.getFew
)

router.post(
    '/',
    [
        check('name', 'Отсутствует имя').exists(),
        check('type', 'Отсутствует порода').exists(),
        check('description', 'Отсутствует описание').exists(),
    ],
    PetController.add
)

router.delete(
    '/',
    [
        query('_id', 'Отсутствует ID питомца').exists()
    ],
    PetController.deleteOne
)

module.exports = router