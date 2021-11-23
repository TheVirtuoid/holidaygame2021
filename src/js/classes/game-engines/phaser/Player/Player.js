import StNicholas from "../Avatars/StNicholas.js";
import Krampus from "../Avatars/Krampus.js";
import Config from "../../../utilities/config.js";
import PresentAmmo from "../Ammo/PresentAmmo.js";
import CoalAmmo from "../Ammo/CoalAmmo.js";

export default class Player {
	#stnick = new StNicholas();
	#krampus = new Krampus();
	#presentAmmo = new PresentAmmo();
	#coalAmmo = new CoalAmmo();
	#keyboard = null;
	#position = {
		x: 0,
		y: 0
	}

	static AVATAR_HEIGHT = 80;
	static STNICK_WIDTH = 34;
	static KRAMPUS_WIDTH = 53;
	static AVATAR_GAP = 75;
	static PRESENT_HEIGHT = PresentAmmo.PRESENTAMMO_HEIGHT;
	static PRESENT_WIDTH = PresentAmmo.PRESENTAMMO_WIDTH;
	static COAL_WIDTH = CoalAmmo.COALAMMO_WIDTH;
	static COAL_HEIGHT = CoalAmmo.COALAMMO_HEIGHT;
	static LIMIT_LEFT = Config.PLAYER_SPEED;
	static LIMIT_RIGHT = Config.WIDTH - Player.AVATAR_GAP - Player.KRAMPUS_WIDTH - Config.PLAYER_SPEED;
	static PLAYER_WIDTH = Player.STNICK_WIDTH + Player.AVATAR_GAP + Player.KRAMPUS_WIDTH;
	static PRESENT_LAUNCH_Y = Config.HEIGHT - Player.AVATAR_HEIGHT;
	static COAL_LAUNCH_Y = Config.HEIGHT - Player.AVATAR_HEIGHT;
	static PRESENT = 0;
	static COAL = 1;

	constructor() {}

	get imageData () {
		return [
			this.#stnick.imageData,
			this.#krampus.imageData,
		]
	}

	get tagStNick () {
		return this.#stnick.imageData.tag;
	}

	get position () {
		return {
			x: this.#position.x,
			y: this.#position.y
		}
	}

	get width () {
		return Player.PLAYER_WIDTH;
	}

	get height () {
		return Player.AVATAR_HEIGHT;
	}

	get keyboardControls () {
		return this.#keyboard;
	}

	load(scene) {
		this.#stnick.load(scene);
		this.#krampus.load(scene);
		this.#presentAmmo.load(scene);
		this.#coalAmmo.load(scene);
		this.#keyboard = scene.input.keyboard.createCursorKeys();
	}

	moveTo(x, y) {
		this.#position = { x, y };
		this.#stnick.moveTo(x, y);
		this.#krampus.moveTo(x + Player.AVATAR_GAP, y);
	}

	initialPosition() {
		const x = Math.floor((Config.WIDTH / 2) - (this.width / 2));
		const y = Config.HEIGHT - this.height;
		this.moveTo(x,y);
	}

	moveLeft() {
		if (this.#position.x > Player.LIMIT_LEFT) {
			this.moveTo(this.#position.x - Config.PLAYER_SPEED, this.#position.y);
		}
	}

	moveRight() {
		if (this.#position.x < Player.LIMIT_RIGHT) {
			this.moveTo(this.#position.x + Config.PLAYER_SPEED, this.#position.y);
		}
	}

	launch(type) {
		switch (type) {
			case Player.PRESENT:
				this.#presentAmmo.moveTo(this.#position.x + Player.STNICK_WIDTH / 2, Player.PRESENT_LAUNCH_Y);
				this.#presentAmmo.fire();
				break;
			case Player.COAL:
				this.#coalAmmo.moveTo(this.#position.x + Player.AVATAR_GAP + Player.KRAMPUS_WIDTH / 2, Player.COAL_LAUNCH_Y);
				this.#coalAmmo.fire();
				break;
		}
	}

}