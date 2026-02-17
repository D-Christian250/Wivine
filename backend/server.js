const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 5000
const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/TEST1')
    .then(() => { console.log("Database connected") })
    .catch((error) => { console.log('failed to connect database', error) })

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: Number
})


const Users = mongoose.model("Users", UserSchema)
 


app.post('/user', async (req, res) => {
    try {
        const createUser = new Users(req.body);
        await createUser.save()
        res.status(201).json(createUser)

    } catch (error) {
        res.status(500).json({ error: Message.error })
    }
})

app.get("/user",async (req,res)=>{
    try {
        const Finduser= await Users.find()
        res.status(201).json(Finduser)
    } catch (error) {
        res.status(500).json({ error: Message.error })
    }
})

app.get("/user/:id",async (req,res)=>{
    try {
        const FinduserOne= await Users.findById(req.params.id)
        res.status(201).json(FinduserOne)
    } catch (error) {
        res.status(500).json({ error: Message.error })
    }
})

app.put("/user/:id",async (req,res)=>{
    try {
        const userUpdate= await Users.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json(userUpdate)
    } catch (error) {
        res.status(500).json({ error: Message.error })
    }
})

app.delete("/user/:id",async (req,res)=>{
    try {
        const userDelete= await Users.findByIdAndDelete(req.params.id)
        res.status(201).json(userDelete)
    } catch (error) {
        res.status(500).json({ error: Message.error })
    }
})


app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})