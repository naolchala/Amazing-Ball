window.addEventListener("keyup", (e) => {
    if (e.code === "KeyL" || e.code === "ArrowRight") {
        ball.jump("right");
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        ball.jump("left");
    }
});

canvas.addEventListener("click", (e) => {
    if (e.x < window.innerWidth / 2) {
        ball.jump("left");
    } else {
        ball.jump("right");
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    handleObstacles();
    if (handleCollistion()) {
        gameover();
        return;
    }
    frame++;
    requestAnimationFrame(animate);
}

function start() {
    startupPanel.style.transform = "translate(-50%, 0) scale(3)";
    startupPanel.style.opacity = "0";
    setTimeout(() => (startupPanel.style.display = "none"), 500);
    scoreCounter.style.transform = "scale(1)";
    animate();
}

function gameover() {
    gameoverPanel.style.display = "block";
    setTimeout(() => {
        gameoverPanel.style.opacity = "1";
        gameoverPanel.style.transform = "translate(-50%, 0) scale(1)";
        scoreCounter.style.transform = "scale(0)";
        let name = localStorage.getItem("name");
        if (!name) {
            name = prompt("Enter your name to save your score");
        }

        if (name) {
            axios
                .post("https://naolsamazing.glitch.me", {
                    name: name,
                    score: score,
                })
                .then(() => {
                    localStorage.setItem("name", name);
                });
        }
    }, 100);

    document.querySelector("#gameover h1").textContent = score;
}

function restart() {
    gameoverPanel.style.opacity = "0";
    gameoverPanel.style.transform = "translate(-50%, 0) scale(3)";
    scoreCounter.style.transform = "scale(1)";
    setTimeout(() => (gameoverPanel.style.display = "none"), 500);

    ball = new Ball();
    obstacles = [];
    frame = 0;
    score = 0;
    speed = 3;
    updateScore();
    animate();
}

function leaderBoards() {
    leaderBoardPanel.style.display = "block";
    setTimeout(() => {
        leaderBoardPanel.style.opacity = "1";
        leaderBoardPanel.style.transform = "translate(-50%, 0) scale(1)";
    }, 100);

    axios.get("https://naolsamazing.glitch.me").then((res) => {
        if (res.data.length > 0) {
            leaderBoardList.innerHTML = "";
            res.data.forEach((person, index) => {
                leaderBoardList.innerHTML += `<div class="list-item">
                <span class="rank">${index + 1}</span>
                <span class="name">${person.name}</span>
                <span class="score">${person.score}</span>
                </div>`;
            });
        }
    });
}

function closeLeaderBoards() {
    leaderBoardPanel.style.opacity = "0";
    leaderBoardPanel.style.transform = "translate(-50%, 0) scale(3)";

    setTimeout(() => (leaderBoardPanel.style.display = "none"), 500);
}
