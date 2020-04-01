class Rock extends Entity {
	constructor(x, y) {
		super(x, y);
		this.canmove = false;
		this.create();
		//this.speed = 8;
	}

	// Create the object asset
	create() {
		this.img = new Image();
		this.img.src = "assets/rock.png";
		this.img.addEventListener(
			"load",
			() => {
				this.loaded = true;
			},
			false
		);
	}
}
