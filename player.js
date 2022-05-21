class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.nextPos = { x: x, y: y - 1 };
    this.canmove = true;
    this.moving = false;
    this.create();
    this.inventory = new Inventory();
    window.addEventListener("keydown", this.keydown.bind(this));
  }

  keydown(event) {
    if (event.code === "Escape" || event.code === "KeyI") {
      if (this.inventory.visible || event.code === "Escape")
        this.inventory.close();
      else this.inventory.open();
    }
  }

  act() {
    for (let e of app.entities.entries) {
      if (e.pos && e.pos.x === this.nextPos.x && e.pos.y === this.nextPos.y)
        e.interact(this);
    }
  }

  update(dt) {
    if (!this.inventory.visible) this.move(dt);
  }

  move(dt) {
    if (this.canmove) {
      if (Keyboard.isDown(Keyboard.INTERACT)) {
        this.act();
      }
      let newPos = Object.assign({}, this.pos);

      if (Keyboard.isDown(Keyboard.UP)) {
        if (this.dir !== "up") {
          this.dir = "up";
          this.canmove = this.moving;
        } else newPos.y--;
      } else if (Keyboard.isDown(Keyboard.DOWN)) {
        if (this.dir !== "down") {
          this.dir = "down";
          this.canmove = this.moving;
        } else newPos.y++;
      } else if (Keyboard.isDown(Keyboard.LEFT)) {
        if (this.dir !== "left") {
          this.dir = "left";
          this.canmove = this.moving;
        } else newPos.x--;
      } else if (Keyboard.isDown(Keyboard.RIGHT)) {
        if (this.dir !== "right") {
          this.dir = "right";
          this.canmove = this.moving;
        } else newPos.x++;
      }

      this.nextPos = Object.assign({}, this.pos);
      if (this.dir === "up") this.nextPos.y--;
      if (this.dir === "down") this.nextPos.y++;
      if (this.dir === "left") this.nextPos.x--;
      if (this.dir === "right") this.nextPos.x++;

      this.moving = false;
      if (newPos.x !== this.pos.x || newPos.y !== this.pos.y) {
        this.moving = true;
        if (super.coll(newPos)) {
          this.pos = newPos;
          this.canmove = false;
        }
      }
    }
    if (!this.canmove) {
      this.off.t += dt;
      let newOff = app.map.tsize - app.map.tsize * (this.off.t / 0.1);
      if (this.off.x !== 0) this.off.x = this.off.x > 0 ? newOff : -newOff;
      if (this.off.y !== 0) this.off.y = this.off.y > 0 ? newOff : -newOff;
      if (this.off.t >= 0.1) {
        this.canmove = true;
        this.off = { x: 0, y: 0, t: 0 };
      }
    }
  }

  // Create the object asset
  create() {
    this.img = Loader.getImage("player");
    this.loaded = true; // TODO: remove this
  }
}
