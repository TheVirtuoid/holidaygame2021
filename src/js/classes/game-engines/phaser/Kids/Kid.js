import Avatar from "../Avatars/Avatar.js";
import Config from "../../../utilities/config.js";

export default class Kid extends Avatar {

	static KID_DIRECTION_LEFT = 1;
	static KID_DIRECTION_RIGHT = -1;
	static KID_TYPE_NICE = 0;
	static KID_TYPE_NAUGHTY = 1;

	#direction;
	#type;

	constructor(args) {
		args.sprite = true;
		args.animated = true;
		super(args);
		this.#direction = args?.direction || Kid.KID_DIRECTION_RIGHT;
	}

	createImage(x, y, counter, type) {
		const scene = this.getScene();
		const image = scene.physics.add.sprite(x, y, this.getTag());
		image.body.setAllowGravity(false);
		image.setCollideWorldBounds(true);
		image.setOrigin(0, 0);
		const { key, start, end, frameRate, repeat } = this.getAnimatedParams();
		scene.anims.create({
			key: `${key}${counter}`,
			frames: scene.anims.generateFrameNumbers(this.getTag(), { start, end }),
			frameRate,
			repeat
		});
		image.play(`${key}${counter}`);
		return image;
	}

	getDirection() {
		return this.#direction;
	}

	setType(type) {
		this.#type = type;
	}

}