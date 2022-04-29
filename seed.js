class Seed extends Entity {
  constructor(x, y, tree, id) {
    super(x, y);
    this.tree = tree;
    this.id = id;
    this.canmove = false;
    this.create();
    this.doColl = false;
    this.name = "seed";
    this.age = 0;
    //this.speed = 8;
  }

  interact(actor) {
    actor.inventory.add(this);
    this.pos = undefined;
  }

  plant(pos) {
    new Tree(pos.x, pos.y);
    delete this;
  }

  tick() {
    if (this.tree) {
      this.age++;
      if (this.age > 2) {
        if (Math.random() > 0.5) {
          this.tree.inventory[this.id] = undefined;
          let newPos = {
            x: this.tree.pos.x + Math.round(Math.random() * 7 - 3),
            y: this.tree.pos.y + Math.round(Math.random() * 7 - 3),
          };
          //this.coll(newPos);
          this.tree = undefined;
          this.plant(newPos);
        }
      }
    }
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
