const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const AuthController = require('../controllers/authController')


router.post(
    '/register',
    [
        check('name', 'Введите корректный email').exists(),
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
    ],
    AuthController.register)

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    AuthController.login)

router.post(
    '/check-auth',
    [
        check('token', 'Введите корректный токен').isJWT(),
    ],
    AuthController.checkAuth)

module.exports = router