const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    email: {type: String, required: true},
    petID: {type: Types.ObjectId, ref: 'Pet'}
})

module.exports = model('Appeal', schema)