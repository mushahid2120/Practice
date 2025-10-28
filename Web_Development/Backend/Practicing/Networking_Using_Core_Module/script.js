const ptag=document.querySelector('p')
const response=await fetch('http://localhost:4000/')
// const data =await response.text()
// console.log(data)


const decoder=new TextDecoder()
for await(const chunk of response.body){
    console.log(chunk)
    // document.write(decoder.decode(chunk))
}