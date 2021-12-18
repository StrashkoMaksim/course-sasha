const {validationResult} = require("express-validator")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

class AuthController {

    async register (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Некорректные данные при регистрации ${req.body}`
                })
            }

            const { name, email, password } = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ name, email, password: hashedPassword })

            await user.save()

            user.password = undefined

            const token = jwt.sign(
                {userId: email},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            console.log({ token, user })

            res.status(201).json({ token, user })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(401).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при авторизации'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(401).json({ message: 'Неверный логин и/или пароль' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({ message: 'Неверный логин и/или пароль' })
            }

            const token = jwt.sign(
                {userId: email},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            user.password = undefined

            res.status(200).json({ token, user })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }

    async checkAuth(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при проверке доступа'
                })
            }

            const {token} = req.body
            let decodedJWT

            await jwt.verify(token, config.get('jwtSecret'), async (err, decoded) => {
                if (err) {
                    res.status(401).json({ message: 'Некорректный токен' })
                    return
                }

                const user = await User.findOne({ email: decoded.userId })
                user.password = undefined

                res.status(200).json({ message: 'Проверка токена прошла успешно', user})
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AuthController()