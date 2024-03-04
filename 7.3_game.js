// selector
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');


// variable
let lastHole;
let timeUp = false;
let score = 0;

// random Time
function randomTime(min,max){
    return Math.round(Math.random() * max);
}

//random hole
function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole){
        console.log("that's the same hole");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// peep
function peep()
{
    const time = randomTime(1000,2000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}


// start game
function startGame()
{
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}


// bonk(hit)
// e is the reference which can hold the object
function bonk(e)
{
    if(!e.isTrusted) return;        //check if click
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click',bonk));

if(score==5){
    alert("you won")
}