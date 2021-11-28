import RightLeftKid from "../Kids/RightLeftKid.js";
import Kid from "../Kids/Kid.js";
import KidImage from "../Kids/KidImage.js";
import Config from "../../../utilities/config.js";

export default class TargetEngine {

	#targets = new Set();
	#timing = 5000;
	#scene = null;
	#counter = 0;
	#rightLeftChild = new RightLeftKid();
	#leftRightChild = null;

	#kidCounter = 15;

	constructor() {}

	load(scene) {
		this.#scene = scene;
		this.#rightLeftChild.load(scene);
	}

	start() {
		this.#timing = 1000;
		this.#targets.clear();
		setTimeout(this.newTarget.bind(this), this.#timing);
	}

	newTarget() {
		this.#timing -= 50;
		this.#counter++;
		const type = Math.random() >= .5 ? Kid.KID_TYPE_NAUGHTY : Kid.KID_TYPE_NICE;
		const speed = Config.KID_SPEED * this.#rightLeftChild.getDirection() * Math.floor(Math.random() * 5);

		const kid = new KidImage({
			kid: this.#rightLeftChild,
			counter: this.#counter,
			type,
			speed
		});
		this.#targets.add(kid);
		kid.run();
		this.#kidCounter--;
		if (this.#kidCounter > 0) {
			setTimeout(this.newTarget.bind(this), this.#timing);
		}
	}

	checkCollisions() {
		this.#targets.forEach((kid) => {
			const collisions = kid.checkCollision();
			if (collisions.wall) {
				kid.stop();
				this.#targets.delete(kid);
			}
		});
	}
}