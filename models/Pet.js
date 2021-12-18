const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true}
})

module.exports = model('Pet', schema)