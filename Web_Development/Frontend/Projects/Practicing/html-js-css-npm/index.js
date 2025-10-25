/*
const promiseOne=new Promise(function(resolve,reject){
    console.log("Inside promise");
    resolve("Mushahid");
    reject(Error);
})

promiseOne.then(function(name){
    console.log("I am inside the then ",name );
}).then(function(){
    console.log("Fine");
}).catch(function(error){
    console.log(error);
})

*/

// Promised Chaining

/*
const i=1;
const a=2;
const p=new Promise(function inp(resolve,reject){
    if (i==1)
        resolve("This is resolve");
    else
        reject("Error From p Promise");
})  

const myp=new Promise(function inmyp(resolve,reject){
    if(a==1)
        resolve("This is inside myp");
    else
        reject("myp Promise is rejected");
        
})

const k=p.then(function resfirst(result){console.log(result); return myp})
.catch((err)=>{console.log(err)})
.then(function ressec(nowwhat){console.log("check"); console.log(nowwhat); console.log("check again");})
// .catch((err)=>{console.log(err);})

console.log(k);
*/


// async await

/*
async function getData(){
    return "hello"
}

getData().then((result)=>{
    console.log(result);
})


const p=new Promise((resolve,reject)=>{setTimeout(()=>{resolve("This is promise is resolve");},5000)})
const p2=new Promise((resolve,reject)=>{setTimeout(()=>{reject("This is p2 Promise and it is resolved")},1000)});
async function handlePromise(){
    console.log("first");
    const val= await p;
    // val.then((result)=>{console.log(result);})
    console.log(val);
    console.log("second");
    const val2= await p2;
    console.log(val2);
    console.log("third");
}

handlePromise().catch((err)=> { console.error(err)});


// Promise API 

const p1=new Promise((resolve,reject)=>{ setTimeout(()=>reject("This is resolve p1"),3000) });
const p2=new Promise((resolve,reject)=>{ setTimeout(()=>reject("This is resolve p2"),2000) });
const p3=new Promise((resolve,reject)=>{ setTimeout(()=>reject("This is resolve p3"),5000) });

// const k=Promise.all([p1,p2,p3]).then((result)=>{ console.log(result)}).catch((err)=> { console.log(err);})
// const k=Promise.allSettled([p1,p2,p3]).then((result)=>{ console.log(result)}).catch((err)=> { console.log(err);})
// const k=Promise.race([p1,p2,p3]).then((result)=>{ console.log(result)}).catch((err)=> { console.error(err);})
// const k=Promise.any([p1,p2,p3]).then((result)=>{ console.log(result)}).catch((err)=> { console.log(err);console.log(err.errors)})


// console.log(this)
function myfun(){
    console.log(this)
}
// myfun()

const obj={
    a:10,
    b:20,
    x: function(){
        const y=()=>console.log(this);
        y();
    }
}

obj.x();

*/

let name1={
    firstname: "Akshay",
    lastname: "Kumar"
}

let name2={
    firstname: "Rohit",
    lastname: "roy"
}

let printFulName=function(hometown,state){
    console.log(this.firstname+" "+this.lastname)
}

printFulName.call(name2,"old delhi","delhi");
printFulName.apply(name1,[ "dhanbad","jharkhand" ]);
let printmyname=printFulName.bind(name2,"mumbai","maharastra")
printmyname()