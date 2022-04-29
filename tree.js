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

  tick(time) {
    if (this.stage == 2) {
      console.log(this.fruits);
      // créer fruit, moins il y en a plus c'est probable
      // 0 = 50%
      // 1 = 25%
      // 2 = 12.5%
      let r = Math.random() * 100;
      if (r < 50 / 2 ** Object.keys(this.inventory).length) {
        console.log("new seed");
        let newSeed = new Seed(undefined, undefined, this, this.fruits);
        this.inventory[this.fruits] = newSeed;
        this.fruits++;
      }
    }
    if ((time - this.birthTime) % 10 === 0 && time - this.birthTime > 0) {
      this.stage++;
      this.ofx += 32;
    }
    if (this.stage > 3) {
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
