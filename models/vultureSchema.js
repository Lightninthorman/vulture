const mongoose = require('mongoose')

const vultureSchema = new mongoose.Schema({
    building:{type:String, required:true},
    floor:{type:String, required:true},
    room:{type:String, required:true, unique:true},
    rmName:String,
    description:{type:String, required:true},
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '3h' },
    }
})

module.exports = mongoose.model('Carcass', vultureSchema)
