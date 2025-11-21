import express, { json } from 'express'
import userList from '../userDB.json' with {type: 'json'}
import directoryList from '../directoryDB.json' with {type: 'json'}
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

    res.json({message: 'User Created'})
})

export default router


