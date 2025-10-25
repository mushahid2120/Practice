const plusBtn=document.querySelector(".plus-btn");
const minusBtn=document.querySelector(".minus-btn");
const count_digit=document.querySelector(".count");
const changedBy=document.querySelector(".changed-by");
const resetBtn=document.querySelector(".reset-btn")

plusBtn.addEventListener('click',()=>{
    const changed_digit=parseInt(count_digit.innerHTML)+parseInt(changedBy.value);
    count_digit.innerHTML=changed_digit;
})
minusBtn.addEventListener('click',()=>{
    const changed_digit=parseInt(count_digit.innerHTML)-parseInt(changedBy.value);
    count_digit.innerHTML=changed_digit;
})

resetBtn.addEventListener('click',()=>{
    changedBy.value='1';
    count_digit.innerHTML='0';
})
