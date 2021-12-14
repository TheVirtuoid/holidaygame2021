import Kid from "./Kid.js";
import Config from "../../../config.js";

export default class LeftRightKid extends Kid {

	static START_X = 0;
	static END_X = Config.WIDTH - Kid.KID_WIDTH;

	constructor(type = Kid.KID_TYPE_NICE) {
		const name = type === Kid.KID_TYPE_NICE ? Kid.KIDS.LEFT_RIGHT.NICE.NAME : Kid.KIDS.LEFT_RIGHT.NAUGHTY.NAME;
		const tag = type === Kid.KID_TYPE_NICE ? Kid.KIDS.LEFT_RIGHT.NICE.TAG : Kid.KIDS.LEFT_RIGHT.NAUGHTY.TAG;
		super({ tag, name,
			animatedParams: {
				key: 'right',
				frameWidth: Kid.KID_WIDTH,
				frameHeight: Kid.KID_HEIGHT,
				start: 0,
				end: 3,
				frameRate: 5,
				repeat: -1
			},
			direction: Kid.KID_DIRECTION_LEFT
		});
		this.setType(type);
	}

	createImage(counter) {
		const x = LeftRightKid.START_X;
		const y = Kid.KID_HEIGHT / 2 * Math.ceil(Math.random() * 6);
		return super.createImage(x, y, counter);
	}
}