const express=require('express')
const mongoose=require('mongoose')
const userSchema = require('./userSchema')
const userRouter=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=new mongoose.model("User",userSchema)


userRouter.post('/signup', async(req,res)=>{
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    try{

    const user=new User({
        name:req.body.name,
        password:hashedPassword
    })

    await user.save();

    res.status(200).json({
        Success:"sign up successfully"
    })
    }
    catch(err){
        console.log(err.message)
        res.status('401').json({
           error:"Authentiation Error"
        })
    }



})


userRouter.post('/login',async(req,res)=>{
    try{
        const user=await User.find({name:req.body.name})
        if(user && user.length>0){
            
            const isPasswordValid= bcrypt.compare(req.body.password,user[0].password)
            console.log(isPasswordValid)
            if(isPasswordValid){
                const object={
                    name:user[0].name,

                }
                const token=jwt.sign(object,'sadhsaknsakhdsalasdl',{
                    expiresIn:'10h'
                })
                res.status(200).json({
                    token,
                })

            }
            else{
                res.status(500).send("authentiaion ")
            }

        }
        
        else{
            res.status(500).send("authentiaion ")
        }

    }
    catch(err){
        console.log(err.message)
        res.status(500).send("authentiaion error")
    }
})

module.exports=userRouter;