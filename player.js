class Player extends Entity {
	constructor(x, y) {
		super(x, y);
		this.moving = false;
		this.create();
		//this.speed = 8;
	}

	coll(newPos) {
		//if (newPos.x >= 0 && newPos.x < W && newPos.y >= 0 && newPos.y < H) {
			// TODO true collision check
			this.off = {
				x: newPos.x - this.pos.x,
				y: newPos.y - this.pos.y,
				t: 0
			}
			this.pos = newPos;
			this.moving = true;
		//}
	}

	move(dt) {
		if (!this.moving) {
			let newPos = Object.assign({}, this.pos);

			if (Keyboard.isDown(Keyboard.UP)) {
				newPos.y--;
			} else if (Keyboard.isDown(Keyboard.DOWN)) {
				newPos.y++;
			} else if (Keyboard.isDown(Keyboard.LEFT)) {
				newPos.x--;
			} else if (Keyboard.isDown(Keyboard.RIGHT)) { 
				newPos.x++;
			}

			if (newPos.x !== this.pos.x || newPos.y !== this.pos.y)
				this.coll(newPos);
		}
		if (this.moving) {
			this.off.t += dt;
			let newOff = map.tsize - (map.tsize * (this.off.t / 0.2))
			if (this.off.x !== 0)
				this.off.x = (this.off.x > 0) ? newOff : -newOff;
			if (this.off.y !== 0)
				this.off.y = (this.off.y > 0) ? newOff : -newOff;
			if (this.off.t >= 0.2)
				this.moving = false;
		}
	}

	// Create the object asset
	create() {
		this.img = new Image();
		this.img.src = "https://raw.githubusercontent.com/Eviber/islands/master/assets/player.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
