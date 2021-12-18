const Appeal = require("../models/Appeal")
const {validationResult} = require("express-validator");

class AppealController {
    async get (req, res) {
        try {
            const appeals = await Appeal.find().populate('petID')

            res.status(200).json(appeals)
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async add (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при отправке обращения'
                })
            }

            const {name, email, message, petID} = req.body
            const appeal = new Appeal({ name, email, message, petID })

            appeal.save()

            res.status(201).json({message: 'Заявка успешно отправлена'})
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async delete (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при удалении обращения'
                })
            }

            const { _id } = req.query

            await Appeal.findOneAndRemove({ _id })

            const appeals = await Appeal.find().populate('petID')

            res.status(200).json(appeals)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AppealController()