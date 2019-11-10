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

router.get('/seed', (req,res) => {
    Carcass.create(
        [
            {
                building:'225 Binney',
                floor:'4',
                room:'404',
                rmName:'Kitchen',
                description:'Sandwiches, no vegan options left.',
                createdBy:'Adam C.',
                comments:['Sorry I took the last one!','The cookies were great!'],
                commentBy:['Katie H.','Peter P.']
            },
            {
                building:'225 Binney',
                floor:'7',
                room:'716',
                rmName:'Big Conference Room',
                description:'Lots of breakfast stuff. Good coffee!',
                createdBy:'Emily U.',
                comments:['No joke, the coffee is way better than what we have in the kitchen.','Danish, where have you been all my life?','Awww man, it\'s all picked over. I don\'t want the grapes that are left...'],
                commentBy:['Katie H.','Peter P.', 'Jeanne L.']
            }
        ]
    )
})

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
    //attach username from session cookie to the post request to allow only  OP to make edits to the post or delete it. Others can add comments.
    req.body.createdBy = req.session.username
    Carcass.create(req.body, (err,newCarcass) => {
        if (err) {
            res.redirect('/dashboard/new')
        }else{
            // console.log(req.body);
            res.redirect('/dashboard')
        }
    })
})


// router.get('/modal/:id',verifyUser,
// (req,res) => {
//     Carcass.findById(req.params.id, (err, foundCarcass) => {
//         res.render('dashboard/modal.ejs', {
//             tabTitle: 'Vulture | Carcass',
//             carcass:foundCarcass
//         })
//     })
// })
//=====
//Show Carcass
//=====
router.get('/:id', verifyUser, (req,res) => {
    Carcass.findById(req.params.id, (err, foundCarcass) => {
        // console.log(foundCarcass);
        res.render('dashboard/modal.ejs',{
            carcass:foundCarcass,
            user:req.session.username
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
        if(err){
            res.send(err)
        }else{
            res.redirect('/dashboard')
        }

    })
})

router.put('/:id/comment', (req,res) => {
    Carcass.findByIdAndUpdate(req.params.id,{$push:{comments:req.body.comments,commentBy:req.session.username}} , (err,updateCarcass) => {
        if (err) {
            res.send(err)
        }
        res.redirect('back')
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
