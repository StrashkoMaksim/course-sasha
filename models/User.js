const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'User'}
})

module.exports = model('SiteUser', schema)