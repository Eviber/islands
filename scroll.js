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
		if (0 <= col && col < this.cols)
			return this.layers[layer][row * map.cols + col];
	}
};

function Camera(map, width, height) {
	this.x = 0;
	this.y = 0;
	this.width = width;
	this.height = height;
	this.maxX = map.cols * map.tsize - width;
	this.maxY = map.rows * map.tsize - height;
}

Camera.SPEED = 256; // pixels per second

Camera.prototype.inBounds = function (pos) {
	let x = pos.x * map.tsize;
	let y = pos.y * map.tsize;
	return (this.x < x && x < this.x + this.width &&
		this.y < y && y < this.y + this.height);
};

Camera.prototype.centerOn = function (entity) {
	this.x = entity.pos.x * map.tsize - this.width / 2 - entity.off.x;
	this.y = entity.pos.y * map.tsize - this.width / 2 - entity.off.y;
};

Camera.prototype.move = function (delta, dirx, diry) {
	// move camera
	this.x += dirx * Camera.SPEED * delta;
	this.y += diry * Camera.SPEED * delta;
	// clamp values
	this.x = Math.max(0, Math.min(this.x, this.maxX));
	this.y = Math.max(0, Math.min(this.y, this.maxY));
};

Game.load = function () {
	return [
		Loader.loadImage('tiles', 'tileset.png'),
	];
};

Game.init = function () {
	Keyboard.listenForEvents(
		[Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
	this.tileAtlas = Loader.getImage('tiles');
	this.camera = new Camera(map, 512, 512);
	this.player = new Player(8, 8);
};

Game.update = function (delta) {
	// handle camera movement with arrow keys
	var dirx = 0;
	var diry = 0;

	this.player.move(delta);
	this.camera.centerOn(this.player);
};

Game._drawLayer = function (layer) {
	var startCol = Math.floor(this.camera.x / map.tsize);
	var endCol = startCol + (this.camera.width / map.tsize);
	var startRow = Math.floor(this.camera.y / map.tsize);
	var endRow = startRow + (this.camera.height / map.tsize);
	var offsetX = -this.camera.x + startCol * map.tsize;
	var offsetY = -this.camera.y + startRow * map.tsize;

	for (var c = startCol; c <= endCol; c++) {
		for (var r = startRow; r <= endRow; r++) {
			var tile = map.getTile(layer, c, r);
			var x = (c - startCol) * map.tsize + offsetX;
			var y = (r - startRow) * map.tsize + offsetY;
			if (tile !== 0) { // 0 => empty tile
				this.ctx.drawImage(
					this.tileAtlas, // image
					(tile - 1) * (map.tsize / 2), // source x
					0, // source y
					map.tsize/2, // source width
					map.tsize/2, // source height
					Math.round(x),  // target x
					Math.round(y), // target y
					map.tsize, // target width
					map.tsize // target height
				);
			}
		}
	}
};

Game.render = function () {
	// draw map background layer
	this._drawLayer(0);
	this.player.render(this.ctx, this.camera);
	// draw map top layer
	this._drawLayer(1);
};
