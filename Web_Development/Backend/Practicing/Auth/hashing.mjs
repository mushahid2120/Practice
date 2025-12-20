import crypto from 'node:crypto'
import { readFile } from 'node:fs/promises'

const myfile= await readFile('./test.txt')
const hash1=crypto.createHash('sha256').update(myfile).digest('hex')
const hash2=crypto.createHash('sha256').update("Hello World").digest('hex')

console.log({hash1,hash2})