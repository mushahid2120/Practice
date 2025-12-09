import express, { json } from 'express'
import userList from '../userDB.json' with {type: 'json'}
import directoryList from '../directoryDB.json' with {type: 'json'}
import authCheck from '../middleware/authCheck.js'
import {writeFile} from 'fs/promises'
import { ObjectId } from 'mongodb'

const router=express.Router()

router.post("/singup",async(req,res)=>{
    const {name,email,password}=req.body
    // const userId=crypto.randomUUID()
    // const dirId=crypto.randomUUID()
    const db=req.db;
    const userCollection=db.collection('user')
    const dirCollection=db.collection('directory')
    const user = await userCollection.findOne({email})
    if(user){
        return res.json({message: "email already exit "})
    }
    
    const dirCreated=await dirCollection.insertOne({
        "name": `root-${email}`,
        "parentDirId": null
    })
    const dirId=dirCreated.insertedId.toString()
    console.log(dirId)

    const userCreated=await userCollection.insertOne({
        name,
        email,
        password,
        rootDirId: dirId
    })

    const userId=userCreated.insertedId.toString()
    console.log(userId)
    const resp=await dirCollection.updateOne({_id: new ObjectId(dirId)},{$set: {userId}})
    console.log(resp)
    
    // await writeFile('./userDB.json',JSON.stringify(userList))
    // await writeFile('./directoryDB.json',JSON.stringify(directoryList))

    const cookieCofig={
        sameSite: 'none',
        secure: true,
        path:'/'
    }

    res.cookie('userId',userId,cookieCofig)
    res.json({message: 'User Created'})
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    // const userData=userList.find((user)=>user.email===email && user.password===password)
    const db=req.db;
    const userCollection=db.collection('user');
    const user=await userCollection.findOne({email,password})

    const cookieCofig={
        sameSite: 'none',
        secure: true,
        path:'/'
    }
    if(user){
        res.cookie('userId',user._id.toString(),cookieCofig)
        return res.json({message: 'Login Successful'})
        }
    else
        return res.status(401).json({error: 'Invalid Credentials'})
})


router.post('/logout',(req,res)=>{
    const cookieCofig={
        sameSite: 'none',
        secure: true,
        path:'/',
        maxAge: 0
    }
    res.cookie('userId','',cookieCofig)
    res.json({message: "Logout Successfull"})
})

router.get('/',authCheck,(req,res)=>{
    res.status(200).json({name: req.user.name,
    email: req.user.email})
})


export default router


