const all_dark=document.querySelector('#all-dark');
const box_dark=document.querySelector('#box-dark');
const body=document.querySelector('body')
const box=document.querySelector('.box-text')

const full_dark_mode=localStorage.getItem('full_dark_mode');
const box_dark_mode=localStorage.getItem('box_dark_mode');

if(full_dark_mode==="on"){
    body.classList.add('dark-mode-full');  
    all_dark.checked
} 
if(box_dark_mode==="on"){
    box.classList.add("dark-mode-box");
    box_dark.checked;
    }




all_dark.addEventListener('change',function(e){
                                if(this.checked){
                                    body.classList.add('dark-mode-full');   
                                    localStorage.setItem("full_dark_mode","on")
                                }
                                else{    
                                    body.classList.remove('dark-mode-full')
                                    localStorage.setItem("full_dark_mode","off")
                                }
})

box_dark.addEventListener('change',function(e){
                                if(this.checked){
                                    box.classList.add("dark-mode-box");
                                    localStorage.setItem("box_dark_mode","on");
                                }
                                else{
                                    box.classList.remove('dark-mode-box')
                                    localStorage.setItem("box_dark_mode","off");
                                }
})