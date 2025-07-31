const clock=document.querySelector('#clock')
let time=new Date()
clock.innerHTML=time.toLocaleTimeString()
setInterval(()=>{
    let time=new Date()
    clock.innerHTML=time.toLocaleTimeString()
},1000)