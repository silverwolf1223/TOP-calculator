const screen = document.querySelector("#screen");

const nums = [...document.querySelectorAll(".number")];

const operators = [...document.querySelectorAll(".operator")];

const equal = document.querySelector("#equals");

const reset = document.querySelector("#reset");

let usedOperator = false;

let num1 = 0;

let num2 = 0;

let operator;

equal.addEventListener('click', () => equals());

reset.addEventListener('click', () => {
    num1 = 0;
    num2 = 0;
    usedOperator = false;
    screen.value = "";
})

nums.forEach((num) => num.addEventListener('click', () => {
    screen.value = screen.value + num.textContent;
    screen.focus();
}));

operators.forEach((op) => op.addEventListener('click', () => {
    if(!usedOperator)
    {
        operate(op.textContent);
        screen.focus();
    }
}));

//only allows numbers so letters aren't calculated
screen.addEventListener("keypress", (event) => {
    const allowedChars = "0123456789.";
    const opChars = "+-*/";
    const key = String.fromCharCode(event.keyCode || event.which);
    if(opChars.includes(key))
    {
        operate(key);
    }
    if (!allowedChars.includes(key)) {
        event.preventDefault();
    }
});

function operate(str)
{
    num1 = +screen.value;
    operator = str;
    screen.value = "";
    usedOperator = true;
}

function equals()
{
    num2 = +screen.value;
    usedOperator = false;
    result = ops[operator](num1, num2);
    screen.value = result;
    screen.focus();
}

const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}