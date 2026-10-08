require("dotenv").config()

const express = require('express')
const mongoose = require ('mongoose')
const postModel = require('./models/post.model')
const { post } = require("./routes/post.route")

// Routes

const app = express()

app.use(express.json())

// Routes
app.use('/api/post', require("./routes/post.route"))


const PORT = process.env.PORT || 5000

const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.DB_URL).then(()=> console.log('DB ga ulandi'))
        app.listen(PORT, () => console.log(`Port http://localhost:${PORT} da ishlayabdi`))

    } catch (error) {
        console.log(`DB ga ulanishda xato bor => ${error}`)
    }
}

bootstrap()