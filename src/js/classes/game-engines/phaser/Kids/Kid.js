import Avatar from "../Avatars/Avatar.js";
import Config from "../../../utilities/config.js";

export default class Kid extends Avatar {

	static KID_DIRECTION_LEFT = 1;
	static KID_DIRECTION_RIGHT = -1;
	static KID_TYPE_NICE = 0;
	static KID_TYPE_NAUGHTY = 1;
	static KID_WIDTH = 39;
	static KID_HEIGHT = 58;
	static OFF_PITCH_LEFT = 0 - Kid.KID_WIDTH;
	static OFF_PITCH_RIGHT = Config.WIDTH + Kid.KID_WIDTH;

	static KIDS = {
		RIGHT_LEFT: {
			NICE: {
				NAME: '/img/rightleft-child-2.png',
				TAG: 'right-left-nice'
			},
			NAUGHTY: {
				NAME: '/img/rightleft-child-naughty-2.png',
				TAG: 'right-left-naughty'
			}
		}
	}

	#direction;
	#type;

	constructor(args) {
		args.sprite = true;
		args.animated = true;
		super(args);
		this.#direction = args?.direction || Kid.KID_DIRECTION_RIGHT;
	}

	createImage(x, y, counter) {
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

	getType() {
		return this.#type;
	}

}