const express = require('express')
const cors = require('cors')
const app = express()

const port  = process.env.PORT || 3000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))


app.get('/' , (req , res) => {
   res.send('<h1>User Microservice </h1>')
})

// require userRoutes
const userRoutes = require('./routes/user.routes')

// using as middleware
app.use('/api/v1/users',userRoutes)



app.listen(port,() => {
    console.log(`user microservice running on port ${port}`)
})
