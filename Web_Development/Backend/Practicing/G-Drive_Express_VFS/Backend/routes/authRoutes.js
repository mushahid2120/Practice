import express, { json } from 'express'
import userList from '../userDB.json' with {type: 'json'}
import directoryList from '../directoryDB.json' with {type: 'json'}
import authCheck from '../middleware/authCheck.js'

import {writeFile} from 'fs/promises'


const router=express.Router()



router.post("/singup",async(req,res)=>{
    const {name,email,password}=req.body
    const userId=crypto.randomUUID()
    const dirId=crypto.randomUUID()

    if(userList.find((user)=>user.email===email)){
        return res.json({message: "email already exit "})
    }

    directoryList.push({
        "id": dirId,
        "name": `root-${email}`,
        "userId": userId,
        "files": [],
        "directories": [],
        "parentDirId": null
    })

    userList.push({
        id: userId,
        name,
        email,
        password,
        rootDirId: dirId
    })
    
    await writeFile('./userDB.json',JSON.stringify(userList))
    await writeFile('./directoryDB.json',JSON.stringify(directoryList))

    const cookieCofig={
        sameSite: 'none',
        secure: true,
        path:'/'
    }

    res.cookie('userId',userId,cookieCofig)
    res.json({message: 'User Created'})
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body
    const userData=userList.find((user)=>user.email===email && user.password===password)

    const cookieCofig={
        sameSite: 'none',
        secure: true,
        path:'/'
    }


    if(userData){
        res.cookie('userId',userData.id,cookieCofig)
        return res.json({message: 'Login Successful'})
        }
    else
        return res.status(401).json({error: 'Invalid Credentials'})
    
})

router.get('/',authCheck,(req,res)=>{
    res.status(200).json({name: req.user.name,
    email: req.user.email})
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

export default router


