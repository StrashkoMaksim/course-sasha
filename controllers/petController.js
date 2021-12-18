const {validationResult} = require("express-validator")
const config = require("config")
const Uuid = require('uuid')
const Pet = require('../models/Pet')
const Appeal = require('../models/Appeal')
const fs = require("fs")

class PetController {
    async getAll (req, res) {
        try {
            const pets = await Pet.find()

            res.status(200).json(pets)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }

    async getFew (req, res) {
        try {
            const allPets = await Pet.find()
            const pets = allPets.slice(-5)

            res.status(200).json(pets)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }

    async add (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при добавлении питомца'
                })
            }

            const {name, type, description} = req.body

            if (!req.files) {
                return res.status(400).json({ message: 'Отсутствует изображение питомца' })
            }

            const img = req.files.img

            if (img.name.slice(-4) != '.jpg') {
                return res.status(400).json({ message: 'Изображение не в формате .jpg' })
            }

            const imgName = Uuid.v4() + ".jpg"

            img.mv(`${config.get('staticPath')}\\${imgName}`)

            const pet = new Pet({name, type, description, 'img': imgName})

            await pet.save()

            const pets = await Pet.find()

            res.status(201).json({message: 'Питомец добавлен', pets})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }


    async deleteOne (req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный ID'
                })
            }

            const { _id } = req.query

            const linkedAppeals = await Appeal.find({ 'petID': _id })
            const appealPromises = []

            if (linkedAppeals.length > 0) {
                linkedAppeals.forEach(appeal => {
                    appealPromises.push(appeal.remove())
                })

                await Promise.all(appealPromises)
            }

            const pet = await Pet.findOne({_id})

            if (!pet) {
                return res.status(400).json({ message: 'Указанный питомец отсутствует' })
            }

            // Удаление изображения питомца
            fs.unlinkSync(`${config.get('staticPath')}\\${pet.img}`)

            // Удаление питомца из списка БД
            await pet.remove()

            // Результирующий массив питомцев
            const pets = await Pet.find()

            res.json({ message: "Питомец успешно удален", pets })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        }
    }
}

module.exports = new PetController()