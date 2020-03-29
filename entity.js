class Entity {
	constructor(x, y) {
		this.pos = {
			x: x,
			y: y
		};
		this.width = 0;
		this.height = 0;
		this.img = null;
		this.loaded = false;
		this.off = {
			x: 0,
			y: 0,
			t: 0
		}
	}

	update() {
		if (!this.moving) this.move();
	}

	render(ctx, camera) {
		if (this.loaded && camera.inBounds(this.pos))
			ctx.drawImage(this.img,
				this.pos.x * map.tsize - camera.x - this.off.x,
				this.pos.y * map.tsize - camera.y - this.off.y
			);
	}
};
