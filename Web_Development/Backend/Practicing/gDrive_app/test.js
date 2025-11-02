import fs from 'fs/promises'

const fileHandle=await fs.open('./Storage/images')
const st=await fileHandle.stat()
console.dir(st.isDirectory())
console.log('end')