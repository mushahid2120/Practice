// Adding Element 
// First Method 
function addLanguage(langName){

    const li=document.createElement('li')
    li.innerHTML=`${langName}`
    document.querySelector('.lan').appendChild(li)

}
addLanguage("python")

// Second Method

function otherlan(langName){
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(langName))
    document.querySelector('.lan').appendChild(li)
}
otherlan('go lang')


const seclang=document.querySelector('li:nth-child(2)')
seclang.innerHTML="mojo";
const newli=document.createElement('li')
newli.innerText="java"
// newli.appendChild(document.createTextNode('c++'))
seclang.replaceWith(newli)


const firlang=document.querySelector('li:first-child')
firlang.outerHTML="<li>c#</li>"

const lastlang=document.querySelector('li:last-child')
lastlang.remove()