const express = require('express')
const router = express.Router()
const Carcass = require('../models/vultureSchema.js')

//== Verify user signed in
const verifyUser = (req,res,next) => {
    if (req.session.username) {
        return next()
    }else{
        res.redirect('/')
    }
}

//=====
//Dashboard
//=====
router.get('/', verifyUser, (req,res) => {
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
router.get('/new', verifyUser, (req,res) => {

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
//Show Carcass
//=====
router.get('/:id', verifyUser, (req,res) => {
    Carcass.findById(req.params.id, (err, foundCarcass) => {
        res.render('dashboard/show.ejs', {
            tabTitle: 'Vulture | Carcass',
            carcass:foundCarcass
        })
    })
})
//=====
//Edit Carcass
//=====
router.get('/:id/edit', verifyUser, (req,res) => {
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

//=====
//Delete Carcass
//=====
router.delete('/:id', (req, res) => {
    Carcass.findByIdAndRemove(req.params.id, (err,deleteCarcass) => {
        res.redirect('/dashboard')
    })
})

module.exports = router
