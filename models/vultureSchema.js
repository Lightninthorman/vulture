const mongoose = require('mongoose')

const vultureSchema = new mongoose.Schema({
    building:{type:String, required:true},
    floor:{type:String, required:true},
    room:{type:String, required:true},
    rmName:String,
    description:{type:String, required:true},
    createdBy:{type:String, default:'Anonymous'},
    comments:[{type:String, default: undefined}],
    commentBy:[{type:String, default: undefined}],
    createdAt: { type: Date, default: Date.now, expires: '120s' }
})

module.exports = mongoose.model('Carcass', vultureSchema)
