import Avatar from "../Avatars/Avatar.js";
import Config from "../../../utilities/config.js";

export default class Ammo extends Avatar{

	static AMMO_VELOCITY = Config.AMMO_SPEED * -1;
	#inTransit = false;

	constructor(args) {
		args.sprite = true;
		super(args);
	}

	fire(x, y) {
		if (!this.#inTransit) {
			this.moveTo(x, y);
			this.setVisible(true);
			this.setVelocity(0, Ammo.AMMO_VELOCITY);
			this.#inTransit = true;
		}
	}

	checkCollision() {
		const ceiling = this.onCeiling();
		const child = null;
		return { ceiling, child };
	}

	ceaseFire() {
		this.#inTransit = false;
		this.setVisible(false);
	}

}