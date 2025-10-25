const input=document.getElementById('input')
const submitButton=document.getElementById('submit')
const preGuess=document.getElementById('preguess')
const remGuess=document.getElementById('remguess')
const result=document.getElementById('result')
const startOver=document.querySelector('#container')

const p=document.createElement('p')
let gameOver=false
let numGuess=1;
let random=parseInt(Math.random()*100+1)
let guessArr=[]
console.log(random)

if(gameOver===false){
    submitButton.addEventListener('click',function(e){
        e.preventDefault()  
        const guessedNum=parseInt(input.value)
        check(guessedNum)
    })
}

function check(guessNum){
    if(isNaN(guessNum)){
        result.innerHTML="Please Enter Valid Number"
        input.value=''
    }
    else
    if(guessNum<1 || guessNum>100){
        result.innerHTML="Please Enter Number between 1 and 100"
        input.value=''
    }
    else
        {
            guessArr.push(guessNum)
            if(numGuess>10){
                displayGuess(guessNum)
                displayMessage(`Game Over. Random number was ${random}`)
                endGame()
            }
            else{
                displayGuess(guessNum)
                checkGuessNum(guessNum)
            }
        }
}

function checkGuessNum(guessNum){
    if(guessNum===random){
        displayMessage('You Won')
        endGame()
    }
    else if(guessNum<random){
        displayMessage('Numberr is Low')
        
    }
    else{
        displayMessage('Number is High')
    }
    }

function displayGuess(guessNum){
    input.value=''
    preGuess.innerHTML+=`${guessNum} `
    numGuess++
    remGuess.innerHTML=`${11-numGuess}`
}

function displayMessage(message){
    if(message==="You Won")
    result.innerHTML=`<h1>${message}</h1>`
    else{
        result.innerHTML=  `${message}`
    }
}


function endGame(){
    input.value=''
    input.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML='<h2 id="start-game">Start Game</h2>'
    p.style.border='4px solid black'
    p.style.cursor='pointer'
    p.style.padding='3px'
    p.style.backgroundColor='blue'
    startOver.appendChild(p)
    gameOver=true;
    startGame()
}

function startGame(){
    const startButton=document.querySelector('#start-game')
    startButton.addEventListener('click',function(){
        random=parseInt(Math.random()*100+1)
        numGuess=1
        preGuess.innerHTML=''
        remGuess.innerHTML=`${11-numGuess}`
        input.removeAttribute('disabled')
        startOver.removeChild(p)
        displayMessage('')
        guessArr=[]
        gameOver=false;
    })
}




