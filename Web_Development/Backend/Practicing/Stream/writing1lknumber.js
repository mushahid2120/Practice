import fs from 'fs/promises'
const fileHandle=await fs.open('oneLakhNum.txt','w')
const writeStream=fileHandle.createWriteStream()

let index=0

function writeNumbers(){
    for (; index <=100000; index++) {
    const isEmpty=writeStream.write(index.toString()+", ")    
    if(!isEmpty){
        break
    }
        
}
}

writeNumbers()

writeStream.on('drain',()=>{
    writeNumbers()
})