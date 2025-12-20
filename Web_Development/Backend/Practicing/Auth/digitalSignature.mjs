import {readFile} from 'node:fs/promises'
import crypto from 'crypto'
import { createWriteStream } from 'node:fs';


const fileContent=await readFile('./test.txt')
const mySecretKey='mysecret'

const signature=crypto.createHash('sha256').update(fileContent).update(mySecretKey).digest('hex');

const writeStream=createWriteStream('./test.txt')
writeStream.write(fileContent)
writeStream.end(signature)