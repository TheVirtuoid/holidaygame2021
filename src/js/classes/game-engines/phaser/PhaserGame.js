import Phaser from "phaser";
import Config from "../../utilities/config.js";
import Player from "./Player/Player.js";

export default class PhaserGame {

	#config = {
		type: Phaser.AUTO,
		width: Config.WIDTH,
		height: Config.HEIGHT,
		parent: Config.ANCHOR_POINT,
		scene: {
			preload: this.preload.bind(this),
			create: this.create.bind(this),
			update: this.update.bind(this)
		}
	};
	#game = null;
	#player = new Player();
	#keyboard = null;

	constructor(gameConfig) {
		this.#config = {...this.#config, ...gameConfig };
		this.#game = new Phaser.Game(this.#config);
	}

	preload() {
		const scene = this.#game.scene.scenes[0];
		this.#player.load(scene);
		// scene.load.image('bag-of-coal', '/img/bag-of-coal-2.png');
		// scene.load.image('present', '/img/present-2.png');
		// scene.load.spritesheet('right-left-child', '/img/rightleft-child-working.png', { frameWidth: 60, frameHeight: 60});
	}

	create() {
		const scene = this.#game.scene.scenes[0];
		this.#player.initialPosition();
		this.#keyboard = this.#player.keyboardControls;
		// const t = scene.add.image(100, 100, 'bag-of-coal');
	}

	update() {
		if (this.#keyboard.right.isDown) {
			this.#player.moveRight();
		} else if (this.#keyboard.left.isDown) {
			this.#player.moveLeft();
		}
	}

}