let buffer = '0';
let runningTotal = 0;
let previousOperator;
const screen = document.querySelector('.display');
function buttonClick(value){
    console.log(value);
    if(isNaN(parseInt(value))===true){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    rerender();
}

function handleNumber(number){
if(buffer==='0'){
    buffer = number;
    
}
else{
    buffer += number;
}

}
function handleMath(value){
    if(buffer === '0'){
        buffer = '0';
    }
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
    console.log(runningTotal);
}

function flushOperation (intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }
    else if(previousOperator === 'x'){
        runningTotal *= intBuffer;
    }
    else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleSymbol(symbol){
    if(symbol === 'C'){
        buffer = '0';
    }
    else if(symbol === '='){
        if(previousOperator === null){
            return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
    }
    else if(symbol === '←'){
        if(buffer.length===1){
            buffer = '0';
        }
        else{
            buffer = buffer.substring(0,buffer.length-1);
        }
    }
    else if(symbol === '+' || symbol === '-' || symbol === 'x' || symbol === '÷' ){
        handleMath(symbol);
    }
}

function init(){
    document
    .querySelector('.buttons')
    .addEventListener("click",function(event){
        buttonClick(event.target.innerText);
    })
}

function rerender(){
    screen.innerText = buffer;
}

init();