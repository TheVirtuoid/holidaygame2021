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
	#targetEngine = null;

	static AVATAR_HEIGHT = 80;
	static STNICK_WIDTH = 34;
	static KRAMPUS_WIDTH = 53;
	static AVATAR_GAP = 75;
	static LIMIT_LEFT = Config.PLAYER_SPEED;
	static LIMIT_RIGHT = Config.WIDTH - Player.AVATAR_GAP - Player.KRAMPUS_WIDTH - Config.PLAYER_SPEED;
	static PLAYER_WIDTH = Player.STNICK_WIDTH + Player.AVATAR_GAP + Player.KRAMPUS_WIDTH;
	static PRESENT_LAUNCH_Y = Config.HEIGHT - Player.AVATAR_HEIGHT;
	static COAL_LAUNCH_Y = Config.HEIGHT - Player.AVATAR_HEIGHT;
	static PRESENT = 1;
	static COAL = 2;
	static NO_COLLISION = 0;

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

	get present () {
		return this.#presentAmmo;
	}

	get coal () {
		return this.#coalAmmo;
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
				this.#presentAmmo.fire(this.#position.x + Player.STNICK_WIDTH / 2, Player.PRESENT_LAUNCH_Y);
				this.#targetEngine.setCollisionPresent()
				break;
			case Player.COAL:
				this.#coalAmmo.fire(this.#position.x + Player.AVATAR_GAP + Player.KRAMPUS_WIDTH / 2, Player.COAL_LAUNCH_Y);
				this.#targetEngine.setCollisionCoal();
				break;
		}
	}

	checkAmmoStatus() {
		if (this.#presentAmmo.checkCollision().ceiling) {
			this.#presentAmmo.ceaseFire();
		}
		if (this.#coalAmmo.checkCollision().ceiling) {
			this.#coalAmmo.ceaseFire();
		}
	}

	setTargetEngine(targetEngine) {
		this.#targetEngine = targetEngine;
	}

	update() {
		if (this.#keyboard.right.isDown) {
			this.moveRight();
		} else if (this.#keyboard.left.isDown) {
			this.moveLeft();
		}
		if (this.#keyboard.space.isDown) {
			this.launch(Player.COAL);
		} else if (this.#keyboard.shift.isDown) {
			this.launch(Player.PRESENT);
		}
		this.checkAmmoStatus();
	}

}