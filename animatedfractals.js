// Canvas Info
const canvas = document.getElementById('slate');
const randomize = document.getElementById('randomize');
const replay = document.getElementById('replay');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'pink';
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 15;
ctx.lineCap = 'round';
ctx.shadowColor = 'rgba(0,0,0,.7)';
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 10;

// Variables

let size = 0;
let sides = 0;
let maxLevel = 0;
let branches = 0;
let spread = 0;
let scale = 0;
let intro = document.getElementById('intro');
let color = 'hsl(' + Math.random() * 360 + ',100%,50%)';
let lineWidth = 15;
let int = setInterval(100);
clearInterval(int);
let timer = 0;

// Functions
function drawBranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.bezierCurveTo(0, size * spread + 100, size * 3, size * scale, size * spread, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
        ctx.save();
        ctx.translate(0, size);
        ctx.rotate(spread);
        ctx.scale(scale,scale);
        drawBranch(level + 1)

        ctx.restore();

        // ctx.save();
        // ctx.translate(size - (size/branches) * i,0);
        // ctx.rotate(-spread);
        // ctx.scale(scale,scale);
        // drawBranch(level + 1)
        // ctx.restore();
    }
    // ctx.beginPath();
    // ctx.arc(size/2, size/2, 10, 0, 2 * Math.PI);
    // ctx.fill();
    ctx.beginPath();
    ctx.arc(size, size, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillRect(-size * 2 - 50,-size * 2 - 50,size/4,size/4);
    ctx.fillRect(-size,-size,size/4,size/4);
}

function drawFractal() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(0);
    ctx.scale(1,1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i < sides; i++){
        drawBranch(0);
        ctx.rotate(Math.PI * 2 / sides);
    }
    ctx.restore();
}

function randomizeFractal() {
    clearInterval(int);
    let extra = Math.floor(Math.random() * 100);
    intro.innerText = '';
    size = canvas.width < canvas.height ? canvas.width * .1 + extra: canvas.height * .1 - extra;
    sides = Math.floor(Math.random() * 10 + 4);
    maxLevel = Math.floor(Math.random() * 4) + 4;
    branches = 1;
    spread = Math.random() * 0.6 - 0.3;
    scale = Math.random() * .2 + .6;
    lineWidth = Math.random() * 10 + 10;
    color = 'hsl(' + Math.random() * 360 + ',100%,50%)';

    int = setInterval(animateFractal, 25);
    timer = 0;

    drawFractal();
}

function animateFractal() {
    if (timer <= 1000) {
        spread += .01;
        size += .075;
        color = 'hsl(' + timer * .1 + ',100%,50%)';
    }
    else {
        spread -= .01;
        size -= .075;
        color = 'hsl(' + timer * .1 + ',100%,50%)';
    }
    timer++;
    if (timer == 2000) {
        timer = 0;
        clearInterval(int);
    }
    drawFractal();
}

replay.addEventListener('click', function() {
    clearInterval(int);
    if (timer <= 1000) {
        spread -= timer * .01;
        size -= timer * .1;
    }
    else {
        spread += (-1000 * .01) + ((timer % 1000) * .01);
        size += (-1000 * .075) + ((timer % 1000) * .075);
    };
    int = setInterval(animateFractal, 25);
    timer = 0;
})

randomize.addEventListener('click', randomizeFractal);

window.addEventListener('resize', function(){
    canvas.width = this.window.innerWidth;
    canvas.height = this.window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width * .1 : canvas.height * .1;
    ctx.shadowColor = 'rgba(0,0,0,.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    drawFractal();
})

