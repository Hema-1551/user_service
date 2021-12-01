const express = require('express')
const cors = require('cors')
const app = express()
const Middleware = require('./middleware')
const dotenv = require('dotenv')

const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
dotenv.config()

app.use(helmet())
app.use(morgan('common'))

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))



app.get('/', (req, res) => {
    res.write('<h1>User Microservice </h1>')
    //console.log(process.env.DB_NAME)
})


// require userRoutes
const userRoutes = require('./routes/user.routes')

// verify token before serving 

// app.use(Middleware.decodeToken)

// using user routes as middleware
app.use('/api/v1/users', userRoutes)



mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, () => {
            console.log(`User microservice running on port ${port}`)
        })
    }).catch((error) => {
        console.log(`${error} \n  Cannot connect to database!` )
    })
