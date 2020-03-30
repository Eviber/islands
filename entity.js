class Entities {
	constructor() {
		this.entries = [];
	}
	add(e) {
		this.entries.push(e);
	}
}

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
		app.entities.add(this);
	}

	coll(newPos) {
		for (let e of app.entities.entries) {
			if (e.pos.x === newPos.x && e.pos.y === newPos.y)
				return ;
		}
		if (app.map.isFree(newPos.x, newPos.y)) {
			// TODO true collision check
			this.off = {
				x: newPos.x - this.pos.x,
				y: newPos.y - this.pos.y,
				t: 0
			}
			this.pos = newPos;
			this.moving = true;
		}
	}

	update() {
		if (!this.moving) this.move();
	}

	render(ctx, camera) {
		if (this.loaded && camera.inBounds(this.pos))
			ctx.drawImage(this.img,
				this.pos.x * app.map.tsize - camera.x - this.off.x,
				this.pos.y * app.map.tsize - camera.y - this.off.y
			);
	}
};
