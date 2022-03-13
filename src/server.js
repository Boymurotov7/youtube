const express = require('express')
const multer = require('multer')
const { PORT } = require('../config.js')
const app = express()
const imageUpload = multer()


const modelMiddleware = require('./middlewares/model.js')
const paginationMiddleware = require('./middlewares/pagination.js')

app.use(modelMiddleware)
app.use(paginationMiddleware)
app.use(imageUpload.single('file'))
app.use(express.json())

const userRouter = require('./routes/user.js')
const authRouter = require('./routes/auth.js')

app.use('/users', userRouter)
app.use('/auth', authRouter)


app.use((error, req, res, next) => {
	res.send({ message: error.message })
	// ...
})

app.listen( PORT, () => console.log('Server is running http://locolhost:'+ PORT ))