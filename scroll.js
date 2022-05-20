var app = {
  time: 0,
  entities: new Entities(),
  map: {
    cols: 24,
    rows: 12,
    tsize: 32,
    // prettier-ignore
    layers: [[
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3,
      3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3,
    ], [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    ]],
    light: [],
    getTile: function (layer, col, row) {
      if (0 <= col && col < this.cols)
        return this.layers[layer][row * app.map.cols + col];
    },
    isFree: function (col, row) {
      if (col < 0 || col >= this.cols || row < 0 || row >= this.rows)
        return false;
      return this.layers[1][row * app.map.cols + col] === 0;
    },
  },
  rotateAndPaintImage: function (context, image, dir, x, y, w, h, ofx, ofy) {
    let angleInRad;

    ofx = ofx !== undefined ? ofx : 0;
    ofy = ofy !== undefined ? ofy : 0;
    switch (dir) {
      case "left":
        angleInRad = Math.PI * 0.5;
        break;
      case "down":
        angleInRad = Math.PI;
        break;
      case "right":
        angleInRad = -Math.PI * 0.5;
        break;
      default:
        angleInRad = 0;
        break;
    }
    context.translate(x + 16, y + 16);
    context.rotate(-angleInRad);
    context.drawImage(image, ofx, ofy, w, h, -16, -16, w, h);
    context.rotate(angleInRad);
    context.translate(-x - 16, -y - 16);
  },
};

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.cols * map.tsize - width;
  this.maxY = map.rows * map.tsize - height;
}

Camera.SPEED = 256; // pixels per second

Camera.prototype.inBounds = function (pos) {
  let x = pos.x * app.map.tsize;
  let y = pos.y * app.map.tsize;
  return (
    this.x < x + app.map.tsize &&
    x < this.x + this.width &&
    this.y < y + app.map.tsize &&
    y < this.y + this.height
  );
};

Camera.prototype.centerOn = function (entity) {
  this.x = entity.pos.x * app.map.tsize - this.width / 2 - entity.off.x;
  this.y = entity.pos.y * app.map.tsize - this.height / 2 - entity.off.y;
};

Camera.prototype.move = function (delta, dirx, diry) {
  // move camera
  this.x += dirx * Camera.SPEED * delta;
  this.y += diry * Camera.SPEED * delta;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};

Game.load = function () {
  return [Loader.loadImage("tiles", "assets/tileset.png")];
};

Game.addTick = function () {
  app.time++;
  for (e of app.entities.entries) {
    e.tick(app.time);
  }
};

Game.init = function () {
  window.setInterval(Game.addTick, 1000);
  Keyboard.listenForEvents([
    Keyboard.LEFT,
    Keyboard.RIGHT,
    Keyboard.UP,
    Keyboard.DOWN,
    Keyboard.INTERACT,
    Keyboard.PLANT,
    Keyboard.INVENTORY,
  ]);
  for (let i = 0; i < app.map.cols; i++) {
    app.map.light[i] = [];
    for (let j = 0; j < app.map.rows; j++) {
      app.map.light[i][j] = 0;
    }
  }
  this.tileAtlas = Loader.getImage("tiles");
  this.camera = new Camera(
    app.map,
    app.ctx.canvas.clientWidth,
    app.ctx.canvas.clientHeight
  );
  this.player = new Player(8, 8);
  new Seed(7, 7);
  new Seed(2, 3);
  new Seed(4, 6);
};

Game.update = function (delta) {
  // handle camera movement with arrow keys
  var dirx = 0;
  var diry = 0;

  for (e of app.entities.entries) {
    e.update(delta);
  }
  this.camera.centerOn(this.player);
};

Game._drawLayer = function (layer) {
  var startCol = Math.floor(this.camera.x / app.map.tsize);
  var endCol = startCol + this.camera.width / app.map.tsize;
  var startRow = Math.floor(this.camera.y / app.map.tsize);
  var endRow = startRow + this.camera.height / app.map.tsize;
  var offsetX = -this.camera.x + startCol * app.map.tsize;
  var offsetY = -this.camera.y + startRow * app.map.tsize;

  for (var c = startCol; c <= endCol; c++) {
    for (var r = startRow; r <= endRow; r++) {
      var tile = app.map.getTile(layer, c, r);
      var x = (c - startCol) * app.map.tsize + offsetX;
      var y = (r - startRow) * app.map.tsize + offsetY;
      if (tile !== 0 && tile !== undefined) {
        // 0 => empty tile
        this.ctx.drawImage(
          this.tileAtlas, // image
          (tile - 1) * app.map.tsize * 2, // source x
          layer * app.map.tsize * 2, // source y
          app.map.tsize * 2, // source width
          app.map.tsize * 2, // source height
          Math.round(x), // target x
          Math.round(y), // target y
          app.map.tsize, // target width
          app.map.tsize // target height
        );
      } else if (layer === 0) {
        this.ctx.drawImage(
          this.tileAtlas, // image
          0, // source x
          0, // source y
          app.map.tsize * 2, // source width
          app.map.tsize * 2, // source height
          Math.round(x), // target x
          Math.round(y), // target y
          app.map.tsize, // target width
          app.map.tsize // target height
        );
      }
    }
  }
};

Game.drawInventory = function (entity) {
  let inv = entity.inventory;
  app.ctx.fillStyle = "#ffffff99";
  app.ctx.fillRect(
    0,
    0,
    app.ctx.canvas.clientWidth / 4,
    (app.ctx.canvas.clientHeight * 3) / 4
  );
  app.ctx.fillStyle = "#000";
  app.ctx.textBaseline = "top";
  app.ctx.font = "18px Arial";
  let x = 20;
  let y = 20;
  for (item of inv.entries) {
    if (inv.entries[inv.cursor] === item)
      app.ctx.fillText("-", 0, y, app.ctx.canvas.clientWidth / 4);
    app.ctx.fillText(item.name, x, y, app.ctx.canvas.clientWidth / 4);
    y += 20;
  }
};

Game.render = function () {
  // draw map background layer
  this._drawLayer(0);
  for (e of app.entities.entries) {
    if (e !== this.player) e.render(app.ctx, this.camera);
  }
  this.player.render(app.ctx, this.camera);
  // draw map top layer
  this._drawLayer(1);
  if (this.player.inventory.visible) this.drawInventory(this.player);
  // Debug: draw the shadow map
  for (let i = 0; i < app.map.cols; i++) {
    for (let j = 0; j < app.map.rows; j++) {
      let x = i * app.map.tsize - this.camera.x;
      let y = j * app.map.tsize - this.camera.y;
      let shadow = app.map.light[i][j];
      if (shadow === undefined) shadow = 0;
      app.ctx.fillStyle = `rgba(0,0,0,${shadow/50})`;
      app.ctx.fillRect(x, y, app.map.tsize, app.map.tsize);
    }
  }
};
