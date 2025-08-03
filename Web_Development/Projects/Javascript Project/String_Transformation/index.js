const user_input=document.querySelector(".input-field");
const lower_case=document.querySelector('.lower-case');
const upper_case=document.querySelector('.upper-case');
const camel_case=document.querySelector('.camel-case');
const pascal_case=document.querySelector('.pascal-case');
const snake_case=document.querySelector('.snake-case');
const kebab_case=document.querySelector('.kebab-case');
const trim_spaces=document.querySelector('.trim-spaces');

user_input.addEventListener('input',(e)=>{
                                            const input_text=e.target.value;
                                            lower_case.innerHTML=input_text.toLowerCase();
                                            upper_case.innerHTML=input_text.toUpperCase();
                                            camel_case.innerHTML=input_text.toLowerCase().split(' ').map((mytext,index)=>{
                                                                                                if(index===0)
                                                                                                    return mytext.toLowerCase();
                                                                                                else
                                                                                                    return mytext.charAt(0).toUpperCase() + mytext.slice(1).toLowerCase();
                                                                                            }).join('')
                                            snake_case.innerHTML=input_text.split(' ').map((mytext)=>{return mytext.toLowerCase();}).join('_')

                                            pascal_case.innerHTML=input_text.split(' ').map((mytext)=>{
                                                                                                    return mytext.charAt(0).toUpperCase() + mytext.slice(1).toLowerCase();
                                                                                            }).join('')
                                            kebab_case.innerHTML=input_text.split(' ').map((mytext)=>{return mytext.toLowerCase();}).join('-')
                                            trim_spaces.innerHTML=input_text.split(' ').map((mytext)=>{return mytext.toLowerCase();}).join('')
})

