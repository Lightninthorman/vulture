const mongoose = require('mongoose')

const vultureSchema = new mongoose.Schema({
    building:{type:String, required:true},
    floor:{type:String, required:true},
    room:{type:String, required:true, unique:true},
    rmName:String,
    description:{type:String, required:true}
})

module.exports = mongoose.model('Carcass', vultureSchema)
