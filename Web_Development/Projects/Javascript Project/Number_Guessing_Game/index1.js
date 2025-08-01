(function project(){
    const remaining_guess=document.querySelector(".remaining-guess-no");
const user_input=document.querySelector("#enter-number");
const feedback=document.querySelector(".feedback");
const record=document.querySelector(".previous-record");
const submit_button=document.querySelector(".submit-button");
const restart_button=document.querySelector(".restart-button");
const form =document.querySelector('form')

let random_number=parseInt(Math.random()*100);
let count=0;
const recordArray=[];

form.addEventListener('submit',
                                (e)=>{
                                        e.preventDefault=false;
                                        count++;
                                        const user_input_number=parseInt(user_input.value);
                                        recordArray.push(user_input_number);
                                        if(user_input_number>random_number)
                                            feedback.innerHTML=`${user_input_number} is too high!`
                                        else if(user_input_number<random_number)
                                                feedback.innerHTML=`${user_input_number} is too low!`
                                        else{
                                            feedback.innerHTML=`You got it in ${count} guesses! The number was ${user_input_number}.`;
                                            submit_button.disabled=true;
                                            restart_button.disabled=false;
                                            user_input.disabled=true;
                                        }
                                        
                                        record.innerHTML=`Your guesses: ${recordArray.join(', ')}`;

                                        user_input.value='';    
                                        remaining_guess.innerHTML= 10-count; 
                                        
                                });


restart_button.addEventListener('click',
                                (e)=>{
                                   e.target.disabled=true;
                                    user_input.disabled=false;
                                    submit_button.disabled=false;
                                    feedback.innerHTML='';
                                    record.innerHTML='';
                                    random_number=parseInt(Math.random()*100);
                                    count=0;
                                    remaining_guess.innerHTML=10;
                                })

})();