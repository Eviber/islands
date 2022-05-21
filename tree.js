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

  // add a shadow to the map.light array in a circle around the tree
  addShadow(radius, value) {
    for (let x = this.pos.x - radius; x <= this.pos.x + radius; x++) {
      for (let y = this.pos.y - radius; y <= this.pos.y + radius; y++) {
        // if out of bounds, do nothing
        if (x < 0 || x >= app.map.light.length || y < 0 || y >= app.map.light[0].length)
          continue;
        // check if we are in the circle
        let a = Math.abs(this.pos.x - x);
        let b = Math.abs(this.pos.y - y);
        let c = Math.sqrt(a * a + b * b);
        if (c <= radius) {
          // add the shadow
          app.map.light[x][y] += value;
        }
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

  ageUp(time) {
    // 20 ticks as a sapling
    // 30 ticks as a tree
    // 40 ticks as a mature tree
    // 50 ticks as a dead tree
    if (time - this.birthTime >= 20 + this.stage * 10) {
      this.stage++;
      this.ofx += 32;
      this.doShadow();
      this.birthTime = time;
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
    this.ageUp(time);
    if (this.stage > 3) {
      app.entities.delete(this);
    }
  }

  create() {
    this.img = Loader.getImage("tree");
    this.loaded = true; // TODO : remove this
  }
}
