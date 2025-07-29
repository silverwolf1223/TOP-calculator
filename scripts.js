const screen = document.querySelector("#screen");

const nums = [...document.querySelectorAll(".number")];

const operators = [...document.querySelectorAll(".operator")];

const equal = document.querySelector("#equals");

const clear = document.querySelector("#reset");

const negative = document.querySelector("#negpos");

let isNeg = false;

let locked = false;

let newNum = false;

let num1 = undefined;

let num2 = undefined;

let operator;

equal.addEventListener('click', () =>  calculate(equal.textContent));

negative.addEventListener('click', () => switchSign());

clear.addEventListener('click', () => {
    num1 = undefined;
    num2 = undefined;
    isNeg = false;
    screen.value = "";
    locked = false;
})

nums.forEach((num) => num.addEventListener('click', () => {
    if(!locked)
    {
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
            screen.value = ops[operator](num1, num2);
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
        screen.value = result;
        num1 = undefined;
        num2 = undefined;
        screen.focus();
    }
    if(screen.value.includes("-"))
    {
        isNeg = true;
    }
    else
    {
        isNeg = false;
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
    const opChars = "+-*/";
    const eqsign = "=";
    const key = String.fromCharCode(event.keyCode || event.which);
    if(opChars.includes(key))
    {
        operate(key);
    }
    if(eqsign.includes(key)||event.key === "Enter")
    {
        equals();
    }
    if(period.includes(key) && screen.value.includes(period))
    {
        event.preventDefault();
    }
    else if (!allowedChars.includes(key) && !period.includes(key)) {
        event.preventDefault();
    }
    if(locked)
    {
        event.preventDefault();
    }
    newNum = false;
});