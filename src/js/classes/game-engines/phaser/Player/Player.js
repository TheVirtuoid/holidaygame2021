import StNicholas from "../Avatars/StNicholas.js";
import Krampus from "../Avatars/Krampus.js";
import Config from "../../../utilities/config.js";

export default class Player {
	#stnick = new StNicholas();
	#krampus = new Krampus();
	#keyboard = null;
	#position = {
		x: 0,
		y: 0
	}

	static AVATAR_HEIGHT = 80;
	static STNICK_WIDTH = 34;
	static KRAMPUS_WIDTH = 53;
	static AVATAR_GAP = 75;
	static LIMIT_LEFT = Config.PLAYER_SPEED;
	static LIMIT_RIGHT = Config.WIDTH - Player.AVATAR_GAP - Player.KRAMPUS_WIDTH - Config.PLAYER_SPEED;
	static PLAYER_WIDTH = Player.STNICK_WIDTH + Player.AVATAR_GAP + Player.KRAMPUS_WIDTH;

	constructor() {}

	get imageData () {
		return [
			this.#stnick.imageData,
			this.#krampus.imageData
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

}