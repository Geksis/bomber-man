
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d")

const wall = {
    width: 60,
    height: 60,
};
const wallPositions = [
    [60, 180, 300, 420],
    [60, 180, 300, 420],
    [60, 180, 300, 420],
    [60, 180, 300, 420],
]

let tempWallPositions = [
    [120, 180, 240, 300, 360],
    [120, 240, 360],
    [0, 60, 120, 180, 240, 300, 360, 420, 480, 540],
    [0, 120, 240, 360, 480],    
    [0, 60, 120, 180, 240, 300, 360, 420, 480, 540],
    [0, 120, 240, 360, 480],  
    [0, 60, 120, 180, 240, 300, 360, 420, 480, 540],
    [120, 240, 360],
    [120, 180, 240, 300, 360],
]

const player = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    speed: 60,
}

function drawWalls(wallPositions) {
    for (let i = 0; i < wallPositions.length; i++) {
        for (let j = 0; j < wallPositions.length; j++) {
            const wallX = wallPositions[i][j]
            const wallY = wallPositions[j][i]
            ctx.fillStyle = "red";
            ctx.fillRect(wallX, wallY, wall.width, wall.height);
        }   
    }
}

function drawTempWalls(tempWallPositions) {
    for (let i = 0; i < tempWallPositions.length; i++) {
        const row = tempWallPositions[i];
        for (let j = 0; j < row.length; j++) {
            const x = row[j];
            const y = i * wall.height;
            ctx.fillStyle = "brown";
            ctx.fillRect(x, y, wall.width, wall.height);
        }
    }
}

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function checkCollisionsPermaWall(player, walls) {
    for (let i = 0; i < wallPositions.length; i++) {
        for (let j = 0; j < wallPositions.length; j++) {
            const wallX = wallPositions[i][j]
            const wallY = wallPositions[j][i]
            const wallRect = {
                x: wallX,
                y: wallY,
                width: wall.width,
                height: wall.height
            };
            if (isColliding(player, wallRect)) {
                return true;
            }
        }
    }
    return false;
}
function checkCollisionsTempWall(player, tempWalls) {
    for (let i = 0; i < tempWallPositions.length; i++) {
        const row = tempWallPositions[i];
        for (let j = 0; j < row.length; j++) {
            const wallX = row[j];
            const wallY = i * wall.height;
            const tempWallRect = {
                x: wallX,
                y: wallY,
                width: wall.width,
                height: wall.height
            };
            if (isColliding(player, tempWallRect)) {
                return true;
            }
        }
    }
    return false;
}
function drawPlayer() {
ctx.fillStyle = "blue";
ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update(){
    clearCanvas();
    drawWalls(wallPositions)
    drawTempWalls(tempWallPositions)
    drawPlayer();
    requestAnimationFrame(update);
}

function getUserKeyboardInput(event) {
    const originalX = player.x;
    const originalY = player.y;

    switch (event.key) {
        case "ArrowUp":
            if (player.y - player.height < 0) {
                return
            } else {
                player.y -= player.speed;
                break;
            }
        case "ArrowDown":
            if (player.y + player.height >= 540) {
                return
            } else {
                player.y += player.speed;
                break;
            }
        case "ArrowLeft":
            if (player.x - player.width < 0) {
                return
            } else {
                player.x -= player.speed;
                break;
            }
        case "ArrowRight":
            if (player.x + player.width >= 540) {
                return
            } else {
                player.x += player.speed;
                break;
            };
            
       };

       if (checkCollisionsPermaWall(player, wallPositions)) {
        player.x = originalX;
        player.y = originalY;
        } else if (checkCollisionsTempWall(player, tempWallPositions)) {
            player.x = originalX;
            player.y =originalY;
        }
};

document.addEventListener('keydown', getUserKeyboardInput);

update();
