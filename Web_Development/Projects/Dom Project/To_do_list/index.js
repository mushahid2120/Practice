/*

const checkBoxList=document.querySelectorAll('.tick-box');
const taskList=document.querySelectorAll('.task-input');
const warning=document.querySelector('.warning');
const progress=document.querySelector('.progress');

console.log(progress.style);

let progressTimes=0;
const progressValue=(100/3);

checkBoxList.forEach((checkBox)=>{
    checkBox.addEventListener('click',(e)=>{
        const  totalTask=totalTaskAssign();
        if(totalTask===0){
            taskComplete(e.target);
        }
        else{
            displayErrorMessage();
        }
    })
})




function totalTaskAssign(){
    let givenTask=0;
    taskList.forEach((eachTask)=>{
        if(eachTask.value==='')
            givenTask++;
    })
    return givenTask;
}

function displayErrorMessage(tickBox){
    warning.classList.add('error')
    taskList.forEach((taskValue)=>{
    taskValue.addEventListener('input',(e)=>{
        // if(warning.getAttribute('class').includes('error'))
            removeDisplayError();                 // Check this it is running continously
    })
})

}

function removeDisplayError(taskValue){
    warning.classList.remove('error')
}

function taskComplete(element){
    element.parentElement.classList.toggle('complete-task')
    if(progressTimes<3)
        progressTimes++;
    progressBar(progressValue*progressTimes)

}


function taskRemove(element){
    element.parentElement.classList.remove('complete-task')
    if(progressTimes>1)
        progressTimes--;
    progressBar(progressValue*progressTimes)
}


function progressBar(proVal){
    progress.style.width=`${proVal}%`
}

*/


const checkBoxList=document.querySelectorAll('.tick-box')
const inputFields=document.querySelectorAll('.task-input')
const warningLabel=document.querySelector('.warning')
const progress=document.querySelector('.progress')
const quotes=document.querySelector('.upper-para')

const allQuotes=[
'Raise the bar by completing your goals!',
'Well begun is half done!',
'Just a step away, keep going!',
'Whoa! You just completed all the goals, time for chill :D'
]

const myData=JSON.parse(localStorage.getItem('myData')) || {
    first:{
        task:'',
        complete:''
    },
    second:{
        task:'',
        complete:''
    },
    third:{
        task:'',
        complete:''
    },
}

const progressValue=100/3;
let progressTimes=0;

// get each checkBox 

checkBoxList.forEach((checkBox)=>{
    // Event Listener for checkBox 
    checkBox.addEventListener('click',function(e){
        const allGoalsFilled=[...inputFields].every((inputItems)=>{
            return inputItems.value;
        })

        if(allGoalsFilled){
            tickOrUntick(checkBox);
        }
        else{
                warningLabel.classList.add('show-error');
        }
    })
})

// task completed or not 

function tickOrUntick(checkBox){
    const checkBoxParent=checkBox.parentElement
            checkBoxParent.classList.toggle('complete-task')
            const nextElement=checkBox.nextElementSibling;
            if(progressTimes<3 && checkBoxParent.getAttribute('class').includes('complete-task'))
                {
                    progressTimes++;
                    myData[nextElement.id].complete=true;
                    nextElement.disabled=true;
                }
            else 
            if(progressTimes>0)
            {
                    progressTimes--;
                    nextElement.disabled=false;
                    myData[nextElement.id].complete=false;
            }

            localStorage.setItem('myData',JSON.stringify(myData));               
            progress.style.width=`${progressValue*progressTimes}%`;

            if(progressTimes===0)
                progress.innerText='';
            else
                progress.innerHTML=`${progressTimes}/3 Completed`;

            quotes.innerText=`${allQuotes[progressTimes]}`
}



// getting each input values 
inputFields.forEach((goal,i)=>{

 // storing input value when page open from local storage 
    console.log(Object.values(myData).length)
    goal.value=myData[goal.id].task;
    // console.log(goal.previousElementSibling)
    if(myData[goal.id].complete===true)
        tickOrUntick(goal.previousElementSibling)

// Event Listener for input when focus
    goal.addEventListener('focus',(e)=>{
        warningLabel.classList.remove('show-error')
        // console.log(e.target.value," ",i)
    })

// Event Listener for input when input happen 

    goal.addEventListener('input',function(e){
        
        // creating object if not present in local storage 

        console.log(e.target.id)
        myData[e.target.id]={
            task:e.target.value,
            complete: false,
        }
        localStorage.setItem('myData',JSON.stringify(myData));
    })
})



