var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var map = {
    cols: 12,
    rows: 12,
    tsize: 64,
    layers: [[
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
        3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
    ], [
        4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
        4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
        4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
    ]],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    }
};

var tileW = 32;
var tileH = 32;

var W = 16;
var H = 16;

// Interactions
var interactions = {
	up: false,
	down: false,
	left: false,
	right: false,
	space: false
};

var Game = function () {
	// World settings
	var assets = []; // All game objects
	var player = new Player(8, 8); // The player
	assets.push(player); // Add the player as a game asset
	var frame = 0; // Frames since the start of the game

	// Setup event listeners
	function setupEvents() {
		document.addEventListener("keyup", function (event) {
			var keyName = event.key;

			switch (keyName) {
				case "ArrowRight":
					interactions.right = false;
					break;
				case "ArrowLeft":
					interactions.left = false;
					break;
				case "ArrowUp":
					interactions.up = false;
					break;
				case "ArrowDown":
					interactions.down = false;
					break;
				default:
					break;
			}
		});

		document.addEventListener("keydown", function (event) {
			var keyName = event.key;

			switch (keyName) {
				case "ArrowRight":
					interactions.right = true;
					break;
				case "ArrowLeft":
					interactions.left = true;
					break;
				case "ArrowUp":
					interactions.up = true;
					break;
				case "ArrowDown":
					interactions.down = true;
					break;
				default:
					break;
			}
		});
	}

	// Startup the game
	function init() {
		setupEvents();
	}

	/* ANIMATION */

	// The render function. It will be called 60 frames/sec
	this.render = function () {
		ctx.fillStyle = "#333";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < assets.length; i++) {
			assets[i].render(interactions); // render all game objects
		}
		frame++;
	};

	// Animate the game by calling the render function in the browser window 60 frames every second
	var self = this;
	window.requestAnimFrame = (function () {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60); // 60 frames per sec
			}
		);
	})();

	var request;
	var loop = function () {
		self.render();
		request = requestAnimFrame(loop);
		frame++;
	};

	loop();

	window.cancelRequestAnimFrame = (function () {
		return (
			window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout
		);
	})();

	init(); // initialize settings before game begins
};

var g = new Game();
