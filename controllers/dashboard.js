const express = require('express')
const router = express.Router()
const Carcass = require('../models/vultureSchema.js')

router.get('/', (req,res) => {
    Carcass.find({}, (err,allCarcasses) => {
        res.render('dashboard/index.ejs',{
            tabTitle : 'Vulture | Dashboard',
            carcass: allCarcasses
        })
    })
})

router.get('/new', (req,res) => {

    res.render('dashboard/new.ejs', {
        tabTitle: "Vulture | Circling Carcass",

    })
})

router.post('/', (req,res) => {
    Carcass.create(req.body, (err,newCarcass) => {
        res.redirect('/dashboard')
    })
})

module.exports = router
