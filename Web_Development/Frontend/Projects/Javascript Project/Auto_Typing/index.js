const prof=document.querySelector('.prof')

const all_prof=['Developer','Student','Writer']


let i=0;
let prof_num=0
let forward_writing=true;
function addLetter(){
    const current_prof=all_prof[prof_num]
    console.log(prof_num)

    if( forward_writing){
        prof.innerHTML=prof.innerHTML+current_prof[i++];
        if(i===current_prof.length)
            forward_writing=false;
    }
    else{
        prof.innerHTML=prof.innerHTML.slice(0,-1);
        i--;
            if(i===-1){
                forward_writing=true;
                i=0;
                if(prof_num<all_prof.length-1)
                    prof_num++;
                else
                    prof_num=0;

            }    
    }
}


setInterval(addLetter,200);