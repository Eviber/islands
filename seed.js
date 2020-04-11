class Seed extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = false;
		this.create();
		this.doColl = false;
		this.name = "seed";
		//this.speed = 8;
	}

	interact(actor) {
		actor.inventory.add(this);
		this.pos = undefined;
	}

	plant(pos) {
		new Tree(pos.x, pos.y);
		delete(this);
	}

	// Create the object asset
	create() {
		this.img = new Image();
		this.img.src = "assets/seed.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
