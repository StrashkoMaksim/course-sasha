const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(fileUpload({}))
app.use(express.static('static'))

app.use(cors({
    origin: '*'
}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/pet', require('./routes/pet.routes'))
app.use('/api/appeal', require('./routes/appeal.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(5000, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()