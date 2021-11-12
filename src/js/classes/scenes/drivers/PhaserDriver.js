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
		this.load.image('stnick', '/img/st-nicholas-2.png');
		this.load.image('krampus', '/img/krampus-2.png');
		this.load.image('present', '/img/present-2.png');
		this.load.image('bagofcoal', '/img/bag-of-coal-2.png');
		this.load.spritesheet('right-left-child', '/img/right-left-child-working.png',
				{ frameWidth: 60, frameHeight: 60}
		);
/*
		this.#images.forEach((image) => {
			this.#scene.load[image.type].apply(this.#scene, image.args);
		});
*/
	}

	#create () {
		this.add.image(50, 120, 'stnick');
		this.add.image(100, 120, 'krampus');
		this.add.image(200, 120, 'present');
		this.add.image(300, 120, 'bagofcoal');
		// const child = this.physics.add.sprite(100, 200, 'right-left-child');
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('right-left-child', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});
	}

	#update () {}

}