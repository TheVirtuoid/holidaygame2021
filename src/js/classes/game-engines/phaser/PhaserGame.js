import Phaser from "phaser";
import Config from "../../utilities/config.js";
import Player from "./Player/Player.js";
import TargetEngine from "./Targets/TargetEngine.js";

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
	#player = new Player(this);
	#targetEngine = null;

	constructor(gameConfig) {
		this.#config = {...this.#config, ...gameConfig };
		this.#game = new Phaser.Game(this.#config);
		this.#targetEngine = new TargetEngine(this.#player);
	}

	preload() {
		const scene = this.#game.scene.scenes[0];
		this.#player.load(scene);
		this.#targetEngine.load(scene);
		// scene.load.spritesheet('right-left-child', '/img/rightleft-child-working.png', { frameWidth: 60, frameHeight: 60});
	}

	create() {
		const scene = this.#game.scene.scenes[0];
		this.#player.initialPosition();
		this.#targetEngine.start();
		// const child = scene.add.sprite(100, 200, 'right-left-child');
/*
		scene.anims.create({
			key: 'left',
			frames: scene.anims.generateFrameNumbers('right-left-child', { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1
		});
*/
		// child.play('left');

	}

	update() {
		this.#player.update();
		this.#targetEngine.update();
	}

}