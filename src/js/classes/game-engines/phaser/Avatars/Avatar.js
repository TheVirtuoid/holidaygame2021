import Config from "../../../utilities/config.js";

export default class Avatar {
	#tag = '';
	#name = '';
	#image = null;
	#scene = null;
	#position = {
		x: 0,
		y: 0
	}
	constructor(args) {
		this.#tag = args?.tag || this.#tag;
		this.#name = args?.name || this.#name;
	}

	get imageData () {
		return { tag: this.#tag, name: this.#name }
	}

	load(scene) {
		this.#scene = scene;
		if (this.#tag && this.#name) {
			scene.load.image(this.#tag, this.#name);
		}
	}

	moveTo(x, y) {
		if (!this.#image) {
			this.#image = this.#scene.add.image(x, y, this.#tag);
			this.#image.setOrigin(0, 0);
		}
		this.#image.setX(x);
		this.#image.setY(y);
		this.#position = { x, y };
	}

	moveLeft() {
		this.moveTo(this.#position.x - Config.PLAYER_SPEED, this.#position.y);
	}

	moveRight() {
		this.moveTo(this.#position.x + Config.PLAYER_SPEED, this.#position.y);
	}

}