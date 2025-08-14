import axios from 'axios'
axios.get('https://jsonplaceholder.typicode.com/todos/1').then((respose)=>{
    console.log(respose.data)
    box.innerHTML=respose.data.title;
})

const box=document.querySelector('.box')
