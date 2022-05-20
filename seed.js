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
    this.ripe = 2;
    this.maxAge = 20;
    this.maturity = 12;
    //this.speed = 8;
  }

  interact(actor) {
    actor.inventory.add(this);
    this.pos = undefined;
  }

  plant(pos) {
    new Tree(pos.x, pos.y);
    app.entities.delete(this);
  }

  tick() {
    if (this.tree) {
      this.age++;
      if (this.age > this.ripe) {
        if (Math.random() > 0.5) { // 50% chance to fall
          this.tree.inventory[this.id] = undefined;
          let pos = {
            x: this.tree.pos.x + Math.round(Math.random() * 7 - 3),
            y: this.tree.pos.y + Math.round(Math.random() * 7 - 3),
          };
          this.tree = undefined;
          let str = `Fell at ${pos.x}, ${pos.y}`;
          if (this.coll(pos)) {
            this.pos = pos;
          } else {
            this.pos = undefined;
            str += " and was blocked";
            app.entities.delete(this);
          }
          // console.log(str);
        }
      }
    } else if (this.pos) {
      this.age++;
      if (this.age > this.maxAge) {
        app.entities.delete(this);
      } else if (this.age > this.maturity) {
        this.plant(this.pos);
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
