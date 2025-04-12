let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highestLevel = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");

document.addEventListener("keypress", function (event) {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userflash")
    setTimeout(() => {
        btn.classList.remove("userflash")
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(index) {
    // console.log(current level ${level});

    if (gameSeq[index] == userSeq[index]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (highestLevel < level) {
            highestLevel = level;
        }
        h4.innerHTML = `The Highest Score is <b>${highestLevel}</b>.`;
        h2.innerText = `Game over! Your score is ${level} Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        resetGame();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");

for (btn of allbtn) {
    btn.addEventListener("click", btnPress)
}

function resetGame() {
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}