const express = require('express')
const cors = require('cors')

const app = express()



app.get('/user' , (req , res) => {

    console.log(req);

    res.send(res.query)
})

app.listen(3000,() => {
    console.log('server running')
})
