const mongoose=require('mongoose')

const TodoSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    description:
    {
        type:String,
        trim:true,
        required:true

    },
    date:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

module.exports=TodoSchema