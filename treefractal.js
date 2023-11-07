const canvas = document.getElementById('drawPad');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('slider');
const sliderTwo = document.getElementById('sliderTwo');
const sliderThree = document.getElementById('sliderThree');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let shrink = sliderThree.value;
let angleNew = (35);
// let maxLevel = 10000;
// let level = 0;
let size = canvas.height/6;

function draw() {
  line(size, canvas.width/2, canvas.height, 0);
}

function line(len, x, y, angle) {
  // level = level + 1;
  // if (maxLevel < level) return;
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.lineWidth = len/10;
  ctx.strokeStyle = 'hsla('+ (120 - .75*(len + 30)) +', 100%, 30%,'+ (len*.05 + .2) +')';
  ctx.shadowColor = 'hsla('+ (120 - .75*(len + 30)) +', 100%, 30%,'+ (len*.05 + .2) +')';
  len > 20 ? ctx.shadowBlur = len*.1 : ctx.shadowBlur = 0;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  if (len < (slider.value * -1 + 23)) {
    ctx.restore()
    return;
  }
  line(len*shrink, 0, -len, (angleNew*Math.PI/180));
  line(len*shrink, 0, -len, -(angleNew*Math.PI/180));
  ctx.restore();
}

draw();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    canvas.width > canvas.height ? size = canvas.height/6 : size = canvas.width/6;
    draw();
});
slider.addEventListener('input', function() {
    console.log(slider.value);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    checkBranches();
    draw();
});

function checkBranches() {
  if (slider.value >= 18) {
    alert('The fractal might load slower at this level of detail')
  }
}

function updateSlider() {
  sliderTwo.value = angleNew;
}

sliderTwo.addEventListener('input', function() {
    console.log(sliderTwo.value);
    angleNew = sliderTwo.value;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();

});

sliderThree.addEventListener('input', function() {
  shrink = sliderThree.value;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  draw();

});

canvas.addEventListener('mousedown', function(e){
    let angleX = 0;
    e.clientX > 100 ? angleX = e.clientX % 100 : angleX = e.clientX % 10;
    let angleY = 0;
    e.clientY > 100 ? angleY = e.clientY % 100 : angleY = e.clientY % 10;
    angleNew = angleX + angleY / 10;
    updateSlider();
    console.log(e.clientX)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw();
})