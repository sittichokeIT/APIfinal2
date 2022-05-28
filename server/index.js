const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000
require('dotenv').config()

//connection
const connection = require('./db')
connection()

app.use(express.json())
app.use(cors())

//routes
const userRouter = require('./routes/user_route')
const subjectRouter = require('./routes/subject_route')
const registerRouter = require('./routes/register_route')
app.use('/api/user',userRouter)
app.use('/api/subject',subjectRouter)
app.use('/api/register',registerRouter)

app.listen(port, () => console.log(`Running on port ${port}`))