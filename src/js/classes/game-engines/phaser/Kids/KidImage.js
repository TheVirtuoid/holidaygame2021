import Config from "../../../utilities/config";
import Player from "../Player/Player.js";

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

	getImage() {
		return this.#image;
	}

	run() {
		this.#image.setVisible(true);
		this.#image.setVelocityX(this.#speed);
	}

	stop() {
		this.#image.setVisible(false);
	}

	hit() {
		this.#image.setVisible(false);
	}

	checkCollision() {
		const wall = this.#image.body.onWall();
		const ceiling = this.#image.body.onCeiling();
		const floor = this.#image.body.onFloor();
		return { wall, ceiling, floor };
	}
}