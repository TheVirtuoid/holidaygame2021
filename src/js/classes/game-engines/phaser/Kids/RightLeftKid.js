import Kid from "./Kid.js";
import Config from "../../../utilities/config.js";

export default class RightLeftKid extends Kid {

	static START_X = Config.WIDTH - Kid.KID_WIDTH;
	static END_X = 0 - Kid.KID_WIDTH;

	constructor(type = Kid.KID_TYPE_NICE) {
		const name = type === Kid.KID_TYPE_NICE ? Kid.KIDS.RIGHT_LEFT.NICE.NAME : Kid.KIDS.RIGHT_LEFT.NAUGHTY.NAME;
		const tag = type === Kid.KID_TYPE_NICE ? Kid.KIDS.RIGHT_LEFT.NICE.TAG : Kid.KIDS.RIGHT_LEFT.NAUGHTY.TAG;
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
			direction: Kid.KID_DIRECTION_RIGHT
		});
		this.setType(type);
	}

	createImage(counter) {
		const x = RightLeftKid.START_X;
		const y = Kid.KID_HEIGHT / 2 * Math.ceil(Math.random() * 6);
		return super.createImage(x, y, counter);
	}
}