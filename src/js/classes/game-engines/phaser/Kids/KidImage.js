import Config from "../../../utilities/config";
import Player from "../Player/Player.js";
import Kid from "./Kid.js";

export default class KidImage {
	#image = null;
	#kid = null;
	#speed = 0;
	#ammoCollision = Player.NO_COLLISION;
	constructor (args) {
		const {kid, counter, type, speed } = args;
		this.#kid = kid;
		this.#speed = speed;
		this.#image = kid.createImage(counter, type);
		this.#image.setData('kid', this);
	}

	get type () {
		return this.#kid.getType();
	}

	getImage() {
		return this.#image;
	}

	run() {
		this.#image.setVelocityX(this.#speed);
		this.#image.setVisible(true);
	}

	stop() {
		this.#image.setVisible(false);
	}

	hit() {
		this.#image.setVisible(false);
	}

	checkCollision() {
		const ceiling = this.#image.body.onCeiling();
		const floor = this.#image.body.onFloor();
		const wall = this.#image.x <= Kid.OFF_PITCH_LEFT || this.#image.x >= Kid.OFF_PITCH_RIGHT;
		return { wall, ceiling, floor };
	}
}