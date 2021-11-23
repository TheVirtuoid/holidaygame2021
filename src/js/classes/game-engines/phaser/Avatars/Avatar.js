import Config from "../../../utilities/config.js";

export default class Avatar {

	static AMMO_VELOCITY = Config.AMMO_SPEED * -1;
	#tag = '';
	#name = '';
	#image = null;
	#scene = null;
	#sprite = false;
	#position = {
		x: 0,
		y: 0
	}
	constructor(args) {
		this.#tag = args?.tag || this.#tag;
		this.#name = args?.name || this.#name;
		this.#sprite = args?.sprite ? args.sprite : false;
	}

	get imageData () {
		return { tag: this.#tag, name: this.#name, position: this.#position }
	}

	load(scene) {
		this.#scene = scene;
		if (this.#tag && this.#name) {
			scene.load.image(this.#tag, this.#name);
		}
	}

	moveTo(x, y) {
		if (!this.#image) {
			if (!this.#sprite) {
				this.#image = this.#scene.add.image(x, y, this.#tag);
			} else {
				this.#image = this.#scene.physics.add.sprite(x, y, this.#tag);
				this.#image.body.setAllowGravity(false);
				this.#image.setCollideWorldBounds(true);
			}
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

	fire() {
		this.#image.setVelocity(0, Avatar.AMMO_VELOCITY);
	}

}