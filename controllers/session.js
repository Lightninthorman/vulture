const express = require('express')
const router = express.Router()
const User = require('../models/userSchema.js')
const bcrypt = require('bcrypt')

router.get('/new', (req,res) => {
    res.render('sessions/new.ejs', {
        tabTitle:'Vulture | Log In'
    })
})

router.post('/', (req,res) => {
    User.findOne({username:req.body.username}, (err, foundUser) => {
        if (foundUser === null) {
            res.send('error')
        }else{
            const doesPasswordMatch = bcrypt.compareSync(req.body.password,foundUser.password)
            if (doesPasswordMatch) {
                req.session.username = foundUser.username
                res.send('/dashboard')
            }else{
                res.send('error')
            }
        }
    })
})

//===
//=Log Out User
//===
router.post('/clear', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }else{
            res.redirect('/')
        }
    })
})

module.exports = router
