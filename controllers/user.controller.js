const admin = require('firebase-admin')

exports.create = (req , res) => {
    res.send('creating a user')
}

exports.findAll = (req , res) => {
    res.send('finding all users')
}

exports.findById = (req , res) => {
    res.send(`find user by id ${req.params.id}`)
}