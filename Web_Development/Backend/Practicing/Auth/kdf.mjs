import { error } from 'node:console'
import crypto from 'node:crypto'

const result=crypto.pbkdf2("password","mysec",10000,32,'sha256',(error,output)=>{console.log(output.toString('base64url'))})

// console.log(result)