class Tree extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = false;
		this.create();
		this.doColl = true;
		this.name = "tree";
	}

	interact(actor) {
		;
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
