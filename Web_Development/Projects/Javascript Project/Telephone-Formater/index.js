const user_input=document.querySelector('input');
const error_message=document.querySelector('.error-message')


let prev_str_len=0;
user_input.addEventListener('input', (e)=>{
                                            const input_value=e.target.value;

                                            // console.log('before='+e.target.value+'\n'+prev_str_len+'===='+e.target.value.length)

                                            
                                            if(input_value.length>=prev_str_len){
                                                
                                                if(input_value.length===4)
                                                    e.target.value=`+(${input_value.slice(0,-1)}) ${input_value.slice(-1)}`
                                                else 
                                                    if(input_value.length===11)
                                                        e.target.value=`${input_value.slice(0,-1)}-${input_value.slice(-1)}`
                                            }
                                            else{

                                                if(input_value.length===7)
                                                    e.target.value=`${input_value.slice(2,5)}`;
                                                else    
                                                    if(input_value.length===11)
                                                        e.target.value=`${input_value.slice(0,-1)}`
                                            }
                                            prev_str_len=user_input.value.length;

                                            if(user_input.value.length>0 && user_input.value.length<15)
                                                error_message.innerHTML='Please enter a valid 10-digit phone number';
                                            else 
                                                error_message.innerHTML='';
})