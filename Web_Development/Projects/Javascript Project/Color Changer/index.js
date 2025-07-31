buttons=document.querySelectorAll('.button')
body=document.querySelector('body')

buttons.forEach((button) => {
    // console.log(button);
    button.addEventListener('click',function(e){
        
        body.style.backgroundColor=e.target.id


    })
});