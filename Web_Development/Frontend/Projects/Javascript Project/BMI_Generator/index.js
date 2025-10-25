const form=document.querySelector('form')
const weight=document.querySelector('#weight')
const height=document.querySelector('#height')
const result=document.querySelector('#result')


form.addEventListener('submit',function(e){
    const w=weight.value;
    const h=(height.value/1000).toFixed(2)
    const bmi=(w/h)
    if(w==='' || isNaN(w) || w<1)
            result.innerHTML='enter valid weight'
    else 
        if (h==='' || isNaN(h) || h<0)
        result.innerHTML='enter valid height'
    else
        result.innerHTML=`BMI index of ${w}w and ${h}h is ${bmi} `;
})