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
          // random position in a radius of 3
          let dir = Math.random() * Math.PI * 2;
          let pos = {
            x: Math.round(this.tree.pos.x + Math.cos(dir) * 3),
            y: Math.round(this.tree.pos.y + Math.sin(dir) * 3)
          };
          let str = `Fell at ${pos.x}, ${pos.y}`;
          if (this.coll(pos)) {
            this.oldPos = this.tree.pos;
            this.pos = pos;
          } else {
            this.pos = undefined;
            str += " and was blocked";
            app.entities.delete(this);
          }
          this.tree = undefined;
          //console.log(str);
        }
      }
    } else if (this.pos) {
      this.age++;
      if (this.age > this.maxAge) {
        app.entities.delete(this);
      } else if (this.age > this.maturity) {
        if (this.coll(this.pos)) {
          this.plant(this.pos);
        } else console.log("Seed blocked");
      }
    }
  }

  // move will animate the seed from the tree to its new position
  // the animation duration is always the same, a single tick (app.tickInterval)
  // the actual position is already set, this function only updates an offset
  move(dt) {
    if (!this.oldPos) return;

    this.off.t += dt * 1000;
    if (this.off.t >= app.tickInterval / 2) {
      this.off = {x: 0, y: 0, t: 0};
      this.oldPos = undefined;
      return;
    }
    let t = this.off.t / (app.tickInterval / 2);
    let dx = (this.oldPos.x - this.pos.x) * app.map.tsize;
    let dy = (this.oldPos.y - this.pos.y) * app.map.tsize;
    this.off.x = dx * t - dx;
    this.off.y = dy * t - dy;
  }

  // Create the object asset
  create() {
    this.img = Loader.getImage("seed");
    this.loaded = true; // TODO: remove this
  }
}
