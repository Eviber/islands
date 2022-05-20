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
    this.fruits = 0;
    this.inventory = {};
  }

  interact(actor) {}

  addShadow(radius, value) {
    for (let x = this.pos.x - radius; x <= this.pos.x + radius; x++) {
      for (let y = this.pos.y - radius; y <= this.pos.y + radius; y++) {
        // create light[x][y] if it doesn't exist
        if (!app.map.light[x]) app.map.light[x] = [];
        if (!app.map.light[x][y]) app.map.light[x][y] = 0;
        app.map.light[x][y] += value;
      }
    }
  }

  // update app.map.light in a circle around the tree depending on this.stage
  // app.map.light is a 2d array
  // 0 or undefined = no shadow
  // 1 or more = shadow
  doShadow() {
    switch (this.stage) {
      case 1:
        this.addShadow(1, 1);
        break;
      case 2:
        // radius = 4
        // note: this will be added to the shadow from the previous case
        this.addShadow(2, 1);
        break;
      case 3:
        // this is the case where the tree is dying and has no leaves, so no shadow
        // we just need to delete the shadow, keeping in mind that the shadow is a coumpound of the previous cases
        this.addShadow(2, -1);
        this.addShadow(1, -1);
        break;
    }
  }

  tick(time) {
    // if stage is 0 and there is a lot of shadow, there is a chance that the tree will die
    if (this.stage == 0) {
      if (Math.random() < app.map.light[this.pos.x][this.pos.y] * 0.1) {
        this.stage = 4;
        this.doShadow();
      }
    }
    if (this.stage == 2) {
      // créer fruit, moins il y en a plus c'est probable
      // 0 = 50%
      // 1 = 25%
      // 2 = 12.5%
      let r = Math.random() * 100;
      if (r < 50 / 2 ** Object.keys(this.inventory).length) {
        let newSeed = new Seed(undefined, undefined, this, this.fruits);
        this.inventory[this.fruits] = newSeed;
        this.fruits++;
      }
    }
    if ((time - this.birthTime) % 10 === 0 && time - this.birthTime > 0) {
      this.stage++;
      this.ofx += 32;
      this.doShadow();
    }
    if (this.stage > 3) {
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
