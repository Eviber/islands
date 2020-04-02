class Inventory {
	constructor() {
		this.entries = [];
		this.cursor = 0;
		this.visible = false;
		this.update = this._update.bind(this);
	}

	add(e) {
		this.entries.push(e);
	}

	remove() {
		if (this.entries.length > 0)
			this.entries.splice(this.cursor, 1);
	}

	_update(event) {
		if (event.code === "ArrowUp") {
			this.cursor--;
		}
		if (event.code === "ArrowDown") {
			this.cursor++;
		}
		if (this.cursor < 0)
			this.cursor = this.entries.length-1;
		if (this.cursor >= this.entries.length)
			this.cursor = 0;
	}

	open() {
		window.addEventListener("keydown", this.update);
		this.cursor = 0;
		this.visible = true;
	}

	close() {
		window.removeEventListener("keydown", this.update);
		this.cursor = 0;
		this.visible = false;
	}
}
