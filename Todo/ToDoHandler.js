const express=require('express')
const mongoose=require('mongoose')
const router=express.Router();

const checkLogIn=require('../user/CheckLogIn')
const TodoSchema=require('./TodoSchema')

const Todo= new mongoose.model("ToDO", TodoSchema)



router.post('/', async (req,res)=>{
    

    try{
    const todo=new Todo(req.body)
      await todo.save();
      res.status("200").json({
          Success:"Data post successfully"
      })

    }
    catch(err){
        console.log(err.message)
    }




})

router.post('/add',async(req,res)=>{

    try{
        const datas=Todo.insertMany(req.body)
        res.status(200).json({
            success:"data success"
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send("data not post")
    }

})


router.get('/:id', async(req,res)=>{

    try{
        const data= await Todo.findOne({_id:req.params.id},{__v:0})


        res.status(201).json({
            data,
        })
    }
    catch(err){
        console.log(err.message)
        res.status(500).send("error")
    }

})

router.get('/', checkLogIn, async(req,res)=>{
    try{

    const datas= await Todo.find({},{__v:0})

    res.status(200).json({
        datas,
    })

    }
    catch(err){
        console.log(err.message)
    }
    

})

router.put('/:id',  async(req,res)=>{

    try{
        const data= await Todo.updateOne({_id:req.params.id},{
            title:req.body.title,
            
        })
        res.status(200).send("data updated")

    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }

})

router.delete("/:id",async(req,res)=>{
    
    try{
    await Todo.deleteOne({_id:req.params.id})
        
    res.status(200).json({
        success:"Deleted"
    })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send("errrs")
    }
    

})
module.exports=router