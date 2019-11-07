const express = require('express')
const router = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        tabTitle:'Vulture | New User'
    })
})

router.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))

    User.create(req.body, (err,newUser) => {
        if (err) {
            res.redirect('/user/new')
        }else{
            req.session.username = newUser.username
            res.redirect('/dashboard')
        }
    })
})

module.exports = router
