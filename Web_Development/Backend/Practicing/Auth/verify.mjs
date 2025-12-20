import {readFile} from 'node:fs/promises'
import crypto from 'crypto'
import { createWriteStream } from 'node:fs';


const fileContent=await readFile('./test.txt','utf-8')
const [fileCont,hashvalue]=fileContent.split('sign: ')
const mySecretKey='mysecret'

const signature=crypto.createHash('sha256').update(fileCont+'sign: ').update(mySecretKey).digest('hex');

if(signature===hashvalue)
    console.log("Document has been not modified")
else
    console.log('Document has been modified')