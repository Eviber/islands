class Tree extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = false;
		this.create();
		this.doColl = true;
		this.name = "tree";
		this.birthTime = app.time;
		this.stage = 0;
		this.ofx = 0;
	}

	interact(actor) {}

	tick(time) {
		if ((time - this.birthTime) % 3 === 0) {
			this.stage++;
			this.ofx += 32;
		}
		if (this.stage > 2) {
			new Seed(this.pos.x, this.pos.y);
			app.entities.delete(this);
		}
	}

	create() {
		this.img = new Image();
		this.img.src = "assets/tree.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
