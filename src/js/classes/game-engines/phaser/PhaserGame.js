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
			update: this.update
		}
	};
	#game = null;
	#player = new Player();

	constructor(gameConfig) {
		this.#config = {...this.#config, ...gameConfig };
		this.#game = new Phaser.Game(this.#config);
	}

	preload() {
		const scene = this.#game.scene.scenes[0];
		this.#player.imageData.forEach( (imageData) => {
			scene.load.image(imageData.tag, imageData.name);
		});
		scene.load.image('bag-of-coal', '/img/bag-of-coal.png');
		scene.load.image('present', '/img/present-2.png');
		scene.load.spritesheet('right-left-child', '/img/rightleft-child-working.png', { frameWidth: 60, frameHeight: 60});
	}

	create() {
		const scene = this.#game.scene.scenes[0];
		scene.add.image(50, 50, this.#player.tagStNick);
	}

	update() {}

}