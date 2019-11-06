const express = require('express')
const router = express.Router()
const Carcass = require('../models/vultureSchema.js')

//=====
//Dashboard
//=====
router.get('/', (req,res) => {
    Carcass.find({}, (err,allCarcasses) => {
        res.render('dashboard/index.ejs',{
            tabTitle : 'Vulture | Dashboard',
            carcass: allCarcasses
        })
    })
})

//=====
//New Carcass
//=====
router.get('/new', (req,res) => {

    res.render('dashboard/new.ejs', {
        tabTitle: "Vulture | Circling Carcass",

    })
})

router.post('/', (req,res) => {
    Carcass.create(req.body, (err,newCarcass) => {
        if (err) {
            res.redirect('/dashboard/new')
        }else{
            res.redirect('/dashboard')
        }
    })
})

//=====
//Edit Carcass
//=====
router.get('/:id/edit', (req,res) => {
    Carcass.findById(req.params.id, (err,foundCarcass) => {
        res.render('dashboard/edit.ejs', {
            tabTitle:'Vulture | Update Carcass',
            carcass:foundCarcass
        })
    })
})

router.put('/:id', (req,res) => {
    Carcass.findByIdAndUpdate(req.params.id, req.body, (err,updateCarcass) => {
        if (err) {
            res.redirect('/dashboard/'+req.params.id)
        }
        res.redirect('/dashboard')
    })
})

module.exports = router
