const screen = document.querySelector("#screen");

const nums = [...document.querySelectorAll(".number")];

const operators = [...document.querySelectorAll(".operator")];

const clearButton = document.querySelector("#reset");

const negative = document.querySelector("#negpos");

const undoButton = document.querySelector("#undo");

let isNeg = false;

let locked = false;

let newNum = false;

let num1 = undefined;

let num2 = undefined;

let operator;

negative.addEventListener('click', () => switchSign());

undoButton.addEventListener('click', () => undo());

clearButton.addEventListener('click', () => clear());

nums.forEach((num) => num.addEventListener('click', () => {
    if(!locked)
    {
        if(num.textContent == "." && screen.value.includes(".")) return;
        if(newNum == true)
        {
            newNum = false;
            screen.value = "";
        }
        screen.value = screen.value + num.textContent;
        screen.focus();
    }
}));

operators.forEach((op) => op.addEventListener('click', () => {
    if(!locked)
    {
        calculate(op.textContent);
        screen.focus();
    }
}));

function clear()
{
    num1 = undefined;
    num2 = undefined;
    operator = "";
    isNeg = false;
    screen.value = "";
    locked = false;
}

function switchSign()
{
    if(!isNeg)
    {
        screen.value = "-" + screen.value;
        isNeg = true;
    }
    else
    {
        screen.value = screen.value.slice(1);
        isNeg = false;
    }
}

function calculate(str)
{
    if(str != "=")
    {
        if(isNaN(num1) && screen.value !== "") 
        {
            num1 = +screen.value;
            operator = str;
            screen.value = "";
        }
        else if(!isNaN(num1) && screen.value !== "")
        {
            num2 = +screen.value;
            result = ops[operator](num1, num2);
            screen.value = Math.round(result * 10000) / 10000;
            num1 = +screen.value;
            newNum = true;
            operator = str;
        }
    }
    else
    {
        if(screen.value !== "") num2 = +screen.value;
        if(isNaN(num1) || isNaN(num2)) return;
        result = ops[operator](num1, num2);
        operator = "";
        screen.value = Math.round(result * 10000) / 10000;
        newNum = true;
        num1 = undefined;
        num2 = undefined;
        screen.focus();
    }
    if(screen.value.includes("-")) isNeg = true;
    else isNeg = false;
}


function undo()
{
    if(operator != "")
    {
        if(isNaN(num2)) screen.value = num1;
        else screen.value = num2;
        operator = null;
        num1 = undefined;
        num2 = undefined;
    }
}

const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {if(b == 0)
        {
            locked = true;
            return "dumbass";
        }
        else
        {
            return a / b;
        }},
};

//only allows numbers so letters aren't calculated
screen.addEventListener("keypress", (event) => {
    const allowedChars = "0123456789";
    const period = ".";
    const opChars = "+-*/=";
    const c = "c"
    const keys = String.fromCharCode(event.keyCode || event.which);
    if(opChars.includes(keys) && !locked)
    {
        calculate(keys);
    }
    if(c.includes(keys)) 
    {
        clear();
    }
    if(period.includes(keys) && screen.value.includes(period)
    || !allowedChars.includes(keys) && !period.includes(keys)
    || locked) 
    event.preventDefault();
    else
    {
        if(newNum == true)
        {
            newNum = false;
            screen.value = "";
        }
    }
});

screen.addEventListener('keydown', (event) =>
{
    if(event.key == "Backspace" && locked)
    {
        event.preventDefault();
    }
});