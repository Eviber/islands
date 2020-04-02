class Player extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = true;
		this.moving = false;
		this.create();
		this.inventory = [];
		this.inventoryOpen = false;
	}

	addToInventory(item) {
		this.inventory.push(item);
		item.pos = undefined;
	}

	act() {
		let newPos = Object.assign({}, this.pos);
		if (this.dir === 'up')
			newPos.y--;
		if (this.dir === 'down')
			newPos.y++;
		if (this.dir === 'left')
			newPos.x--;
		if (this.dir === 'right')
			newPos.x++;
		for (let e of app.entities.entries) {
			if (e.pos && e.pos.x === newPos.x && e.pos.y === newPos.y)
				e.interact(this);
		}
	}

	move(dt) {
		if (Keyboard.isDown(Keyboard.INVENTORY)) {
			this.inventoryOpen = true;
		}
		if (this.canmove) {
			if (Keyboard.isDown(Keyboard.INTERACT)) {
				this.act();
			}
			let newPos = Object.assign({}, this.pos);

			if (Keyboard.isDown(Keyboard.UP)) {
				if (this.dir !== 'up') {
					this.dir = "up";
					this.canmove = this.moving;
				} else
					newPos.y--;
			} else if (Keyboard.isDown(Keyboard.DOWN)) {
				if (this.dir !== "down") {
					this.dir = "down";
					this.canmove = this.moving;
				} else
					newPos.y++;
			} else if (Keyboard.isDown(Keyboard.LEFT)) {
				if (this.dir !== "left") {
					this.dir = "left";
					this.canmove = this.moving;
				} else
					newPos.x--;
			} else if (Keyboard.isDown(Keyboard.RIGHT)) {
				if (this.dir !== "right") {
					this.dir = "right";
					this.canmove = this.moving;
				} else
					newPos.x++;
			}

			this.moving = false;
			if (newPos.x !== this.pos.x || newPos.y !== this.pos.y) {
				this.moving = true;
				super.coll(newPos);
			}
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
