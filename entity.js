class Entities {
  constructor() {
    this.entries = [];
  }
  add(e) {
    this.entries.push(e);
  }
  delete(entity) {
    this.entries = this.entries.filter((e) => e !== entity);
  }
}

class Entity {
  constructor(x, y) {
    this.name = "Unnamed entity";
    if (x !== undefined && y !== undefined)
      this.pos = {
        x: x,
        y: y,
      };
    this.width = 0;
    this.height = 0;
    this.img = null;
    this.loaded = false;
    this.doColl = false;
    this.dir = "up";
    this.throwable = true;
    this.plantable = false;
    this.off = {
      x: 0,
      y: 0,
      t: 0,
    };
    app.entities.add(this);
  }

  coll(newPos) {
    for (let e of app.entities.entries) {
      if (e.pos && e.pos.x === newPos.x && e.pos.y === newPos.y && e.doColl)
        return false;
    }
    if (app.map.isFree(newPos.x, newPos.y)) {
      if (this.pos)
        this.off = {
          x: newPos.x - this.pos.x,
          y: newPos.y - this.pos.y,
          t: 0,
        };
      return true;
    }
    return false;
  }

  move() {}

  interact() {
    console.log("interacted!");
  }

  update(dt) {
    this.move(dt);
  }

  tick(time) {}

  render(ctx, camera) {
    if (this.loaded && this.pos && camera.inBounds(this.pos)) {
      let x = this.pos.x * app.map.tsize - camera.x - this.off.x;
      let y = this.pos.y * app.map.tsize - camera.y - this.off.y;
      let w = 32;
      let h = 32;
      app.rotateAndPaintImage(
        app.ctx,
        this.img,
        this.dir,
        x,
        y,
        w,
        h,
        this.ofx,
        this.ofy
      );
    }
  }
}
