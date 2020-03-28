class Player extends Entity {
	constructor(x, y) {
		super(x, y);
		this.moving = false;
		this.create();
	}

	coll(newPos) {
		if (newPos.x >= 0 && newPos.x < W && newPos.y >= 0 && newPos.y < H) {
			// TODO true collision check
			this.pos = newPos;
			this.moving = true;
			window.setTimeout(() => {
				this.moving = false;
			}, 100);
		}
	}

	move() {
		let newPos = Object.assign({}, this.pos);

		if (interactions.up) {
			newPos.y--;
		} else if (interactions.down) {
			newPos.y++;
		} else if (interactions.left) {
			newPos.x--;
		} else if (interactions.right) {
			newPos.x++;
		}

		this.coll(newPos);
	}

	// Create the object asset
	create() {
		this.img = new Image();
		this.img.src = "player.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
