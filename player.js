class Player extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = true;
		this.create();
		//this.speed = 8;
	}

	move(dt) {
		if (this.canmove) {
			let newPos = Object.assign({}, this.pos);

			if (Keyboard.isDown(Keyboard.UP)) {
				newPos.y--;
				this.dir = "up";
			} else if (Keyboard.isDown(Keyboard.DOWN)) {
				newPos.y++;
				this.dir = "down";
			} else if (Keyboard.isDown(Keyboard.LEFT)) {
				newPos.x--;
				this.dir = "left";
			} else if (Keyboard.isDown(Keyboard.RIGHT)) { 
				newPos.x++;
				this.dir = "right";
			}

			if (newPos.x !== this.pos.x || newPos.y !== this.pos.y)
				super.coll(newPos);
		}
		if (!this.canmove) {
			this.off.t += dt;
			let newOff = app.map.tsize - (app.map.tsize * (this.off.t / 0.2))
			if (this.off.x !== 0)
				this.off.x = (this.off.x > 0) ? newOff : -newOff;
			if (this.off.y !== 0)
				this.off.y = (this.off.y > 0) ? newOff : -newOff;
			if (this.off.t >= 0.2) {
				this.canmove = true;
				this.off = {x:0,y:0,t:0};
			}
		}
	}

	// Create the object asset
	create() {
		this.img = new Image();
		this.img.src = "assets/player.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
