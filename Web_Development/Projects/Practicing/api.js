 
// xhr older way to fetch api
// function xhrHttpResquest(method,url,callback_fun){
//     const xhr= new XMLHttpRequest();
//     xhr.responseType='json';
//     xhr.addEventListener('load',()=>{
//                                     callback_fun(xhr.response)
//     })
//     xhr.open(method,url)
//     xhr.send()
// }
// call back hell 
// xhrHttpResquest('GET','https://fakestoreapi.com/users',(all_user_data)=>{
//     console.log(all_user_data[0].name)
//     xhrHttpResquest('GET',`https://fakestoreapi.com/users/${all_user_data[0].id}`,(userId)=>{
//         console.log(userId.name)
//     })
// })


// resolving callback hell
// function xhrHttpResquest(method,url,callback_fun){
//     const xhr= new XMLHttpRequest();
//     xhr.responseType='json';
//     const promise = new Promise((resolve,reject)=>{
//     xhr.addEventListener('load',()=>{
//                                     resolve(xhr.response)
//     })
//     })

//     xhr.open(method,url)
//     xhr.send()
//     return promise
// }

// xhrHttpResquest('GET','https://fakestoreapi.com/users')
//     .then((userData)=>{
//         console.log(userData[0].name);
//     })
//     .catch(()=>console.log("Error happened"));


// fetch('https://fakestoreapi.com/users')
//     .then((res)=>{
//         console.log(res)
//         return res.json()
//                     })
//     .then((data)=>{console.log(data)})
//     .catch((err)=>console.log(err))