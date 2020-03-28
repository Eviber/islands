var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tileW = 32;
var tileH = 32;

var W = 16;
var H = 16;

world = [];

function smoothStart3(x) {
	return x * x * x;
}

//document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", clickHandler, false);

function clickHandler(e) {
	const x = Math.floor((e.clientX - canvas.offsetLeft) / 32);
	const y = Math.floor(e.clientY / 32);
	if (x >= 0 && x < 512 && y >= 0 && y < 512) {
		world[y][x]++;
		if (world[y][x] > 4) world[y][x] = 0;
	}
}

function getColorFromVal(val) {
	let t = ["black", "green", "yellow", "blue", "purple"];
	return t[val];
}

function drawWorld(world) {
	for (let y = 0; y < 16; y++) {
		for (let x = 0; x < 16; x++) {
			ctx.fillStyle = getColorFromVal(world[y][x]);
			ctx.fillRect(x * 32, y * 32, W, H);
		}
	}
}

function emptyWorld() {
	world = [];
	for (let y = 0; y < 16; y++) {
		world[y] = [];
		for (let x = 0; x < 16; x++) world[y][x] = 0;
	}
	return world;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawWorld(world);
	requestAnimationFrame(draw);
}

world = emptyWorld();
draw();
