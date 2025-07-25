const screen = document.querySelector("#screen");

const nums = [...document.querySelectorAll(".number")];

const operators = [...document.querySelectorAll(".operator")];

let operator = false;

nums.forEach((num) => num.addEventListener('click', () => screen.value = screen.value + num.textContent));

operators.forEach((op) => op.addEventListener('click', () => {
    if(!operator)
    {
        screen.value = screen.value + op.textContent;
    }

}));

//only allows numbers so letters aren't calculated
screen.addEventListener("keypress", (event) => {
    const allowedChars = "0123456789";
    const key = String.fromCharCode(event.keyCode || event.which);
    if (!allowedChars.includes(key)) {
        event.preventDefault();
    }
});

//only allows 1 operator at a time
if(!operator)
{
    screen.addEventListener("keypress", (event) => {
    const allowedChars ="+-*/";
    const key = String.fromCharCode(event.keyCode || event.which);
    if (!allowedChars.includes(key)) {
        event.preventDefault();
    }
    });
}
