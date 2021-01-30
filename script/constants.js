const gameoverPanel = document.querySelector("#gameover");
const startupPanel = document.querySelector("#startup");
const scoreCounter = document.querySelector("#scoreCounter");
const leaderBoardPanel = document.querySelector("#leaderboards");
const leaderBoardList = document.querySelector(".list");
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = window.innerHeight;

let speed = 3;
let frame = 0;
let score = 0;
let space = 200;

window.addEventListener("resize", (e) => {
    canvas.height = window.innerHeight;

    canvas.width = 400;
    if (window.innerWidth < 480) {
        canvas.width = window.innerWidth;
    }
});

const colors = [
    "#cddc39",
    "#00bcd4",
    "#ffeb3b",
    "#ef9a9a",
    "#ba68c8",
    "#ffa726",
    "#4caf50",
    "#3f51b5",
    "#1ed8c7",
    "#ff5722",
];

function randInt(min, max) {
    return Math.floor(Math.random() * max + min);
}

function randColor() {
    return colors[randInt(0, colors.length)];
}

function updateScore() {
    scoreCounter.textContent = score;
}
