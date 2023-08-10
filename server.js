const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const port=8000;

//SLrSAMAMtXuGoyhi

const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


mongoose.connect('mongodb+srv://manishkmr406:SLrSAMAMtXuGoyhi@formbuilderapp.ejnv7lw.mongodb.net/formData',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("mongoose Connected")
}).catch(()=>{
    console.log("Something wrong")
})
// app.set('view engine','ejs')
const formdata= new mongoose.Schema({
    cat: [{type:String}],
    categoryAns:[{category: {type:String},Answer: {type:String}}],
})

const Userdata=mongoose.model("data",formdata);

app.post("/form",async (req,res)=>{
   try {
    const data=req.body
    console.log(data)
    res.send(data)
    const newData= new Userdata(req.body)
    console.log(newData)
    await newData.save()
    console.log("saved")
   } catch (error) {
     console.log(error)
   } 
})

app.listen(port,()=>{
    console.log("Server started at"+" "+port);
})