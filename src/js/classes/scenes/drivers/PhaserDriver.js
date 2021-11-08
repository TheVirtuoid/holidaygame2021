import Phaser from "phaser";

export default class PhaserDriver {

	config;
	#images;
	#scene;

	constructor(config) {
		this.config = config;
		this.config.type = this.config.type || Phaser.AUTO;
		this.config.parent = this.config.anchorPoint || 'pitch';
	}

	createScene(config) {
		const newConfig = config || this.config;
		newConfig.scene = {
			preload: this.#preload,
			create: this.#create,
			update: this.#update.bind(this)
		}
		this.#scene = new Phaser.Game(this.config);
		return this.#scene;
	}

	setImages(images) {
		this.#images = images;
	}

	#preload () {
		console.log(this);
		this.load.image('stnick', '/img/st-nicholas.png');
/*
		this.#images.forEach((image) => {
			this.#scene.load[image.type].apply(this.#scene, image.args);
		});
*/
	}

	#create () {
		this.add.image(0, 0, 'stnick');
	}

	#update () {}

}