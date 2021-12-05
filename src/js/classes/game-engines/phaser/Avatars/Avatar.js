import Config from "../../../utilities/config.js";

export default class Avatar {

	static AMMO_VELOCITY = Config.AMMO_SPEED * -1;
	#tag = '';
	#name = '';
	#image = null;
	#scene = null;
	#sprite = false;
	#animated = false;
	#animatedParams = {};
	#animationCount = 0;
	#position = {
		x: 0,
		y: 0
	}
	constructor(args) {
		this.#tag = args?.tag || this.#tag;
		this.#name = args?.name || this.#name;
		this.#sprite = args?.sprite ? args.sprite : false;
		this.#animated = args?.animated ? args.animated : false;
		this.#animatedParams = args?.animatedParams ? args.animatedParams : false;
	}

	get imageData () {
		return { tag: this.#tag, name: this.#name, position: this.#position }
	}

	getScene() {
		return this.#scene;
	}

	getTag() {
		return this.#tag;
	}

	getImage() {
		return this.#image;
	}

	getAnimatedParams() {
		return this.#animatedParams;
	}

	load(scene) {
		this.#scene = scene;
		if (this.#tag && this.#name) {
			if (this.#animated) {
				const { frameWidth, frameHeight } = this.#animatedParams;
				scene.load.spritesheet(this.#tag, this.#name, { frameWidth, frameHeight });
			} else {
				scene.load.image(this.#tag, this.#name);
			}
		}
	}

	addImage (x, y) {
		this.#image = this.#scene.add.image(x, y, this.#tag);
	}

	addSprite (x, y) {
		this.#image = this.#scene.physics.add.sprite(x, y, this.#tag);
		this.#image.body.setAllowGravity(false);
		this.#image.setCollideWorldBounds(true);
	}

	addAnimation (x, y, animationKey = null) {
		this.addSprite(x, y);
		this.#animationCount++;
		const { start, end, frameRate, repeat } = this.#animatedParams;
		this.#scene.anims.create({
			key: animationKey ? animationKey : `anim${this.#animationCount}`,
			frames: this.#scene.anims.generateFrameNumbers(this.#tag, { start, end }),
			frameRate,
			repeat
		});

	}

	moveTo(x, y) {
		if (!this.#image) {
			if (!this.#sprite) {
				this.addImage(x, y);
			} else if (this.#animated) {
				this.addAnimation(x, y);
			} else {
				this.addSprite(x, y);
			}
			this.#image.setOrigin(0, 0);
		}
		this.#image.setX(x);
		this.#image.setY(y);
		this.#position = { x, y };
	}

	moveLeft() {
		this.moveTo(this.#position.x - Config.PLAYER_SPEED, this.#position.y);
	}

	moveRight() {
		this.moveTo(this.#position.x + Config.PLAYER_SPEED, this.#position.y);
	}

	setVelocity(x, y) {
		if (this.#image) {
			this.#image.setVelocity(x, y);
		}
	}

	onCeiling() {
		return this.#image ? this.#image.body.onCeiling() : false;
	}

	setVisible(visibility) {
		if (this.#image) {
			this.#image.setVisible(visibility);
		}
	}

}