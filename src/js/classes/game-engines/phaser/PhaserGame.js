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
		},
		physics: {
			default: 'arcade',
			arcade: {
				debug: false,
				gravity: false
			}
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
		// scene.load.spritesheet('right-left-child', '/img/rightleft-child-working.png', { frameWidth: 60, frameHeight: 60});
	}

	create() {
		const scene = this.#game.scene.scenes[0];
		this.#player.initialPosition();
		this.#keyboard = this.#player.keyboardControls;
		scene.physics.world.on('worldbounds', (event) => {
			console.log(event);
		});
	}

	update() {
		if (this.#keyboard.right.isDown) {
			this.#player.moveRight();
		} else if (this.#keyboard.left.isDown) {
			this.#player.moveLeft();
		}
		if (this.#keyboard.space.isDown) {
			this.#player.launch(Player.COAL);
		} else if (this.#keyboard.shift.isDown) {
			this.#player.launch(Player.PRESENT);
		}
	}

}