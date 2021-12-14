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
		this.#targetEngine = new TargetEngine(this.#player, {
			highScoreDom: this.#config.highScoreDom,
			gameScoreDom: this.#config.gameScoreDom,
			healthScoreDom: this.#config.healthScoreDom
		});
	}

	preload() {
		const scene = this.#game.scene.scenes[0];
		this.#player.load(scene);
		this.#targetEngine.load(scene);
	}

	create() {
		const scene = this.#game.scene.scenes[0];
		this.#player.initialPosition();
		this.#targetEngine.start();

	}

	update() {
		this.#player.update();
		this.#targetEngine.update();
		if (this.#targetEngine.isGameOver()) {
			this.finished();
		}
	}

	finished() {
		this.#game.destroy();
		document.dispatchEvent(new CustomEvent('game-over', {detail: this.#targetEngine.getScore()}));
	}

}