class Entity {
	constructor(x, y) {
		this.pos = {
			x: x,
			y: y
		};
		this.img = null;
		this.loaded = false;
	}

	render() {
		if (!this.moving) this.move();
		if (this.loaded)
			ctx.drawImage(this.img, this.pos.x * tileW, this.pos.y * tileH);
	}
};
