// a beaver is an entity that can move around, swim, cut trees, and build a dam
// a dam is a structure built in a river that acts as a bridge
// in practice, it will simply be a tile that can be walked on

class Beaver extends Entity {
  constructor(x, y) {
    super(x, y);
    this.canmove = true;
    this.canswim = true;
    this.create();
    this.doColl = true;
    this.name = "beaver";
    this.birthTime = app.time;
  }

  interact(actor) {}

  tick(time) {}

  create() {
    this.img = new Image();
    this.img.src = "assets/tree.png"; // TODO: add a beaver sprite
    this.img.addEventListener(
      "load",
      () => {
        this.loaded = true;
      },
      false
    );
  }
}
