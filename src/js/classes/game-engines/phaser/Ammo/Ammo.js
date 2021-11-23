export default class Ammo {

	#image = null;

	constructor(args) {
		if (args?.image) {
			this.#image = new args.image();
		}
	}

	load(scene) {
		this.#image.load(scene);
	}

	moveTo(x, y) {
		this.#image.moveTo(x, y);
	}

	fire() {
		this.#image.fire();
	}

	get imageData() {
		return this.#image.imageData;
	}

}