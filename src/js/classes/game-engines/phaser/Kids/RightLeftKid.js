import Kid from "./Kid.js";
import Config from "../../../utilities/config.js";

export default class RightLeftKid extends Kid {

	static KID_WIDTH = 39;
	static KID_HEIGHT = 58;
	static START_X = Config.WIDTH - RightLeftKid.KID_WIDTH;

	constructor() {
		super({ tag: `right-left-kid`, name: '/img/rightleft-child-2.png',
			animatedParams: {
				key: 'right',
				frameWidth: RightLeftKid.KID_WIDTH,
				frameHeight: RightLeftKid.KID_HEIGHT,
				start: 0,
				end: 3,
				frameRate: 5,
				repeat: -1
			},
			direction: Kid.KID_DIRECTION_RIGHT
		});
	}

	createImage(counter, type) {
		const x = RightLeftKid.START_X;
		const y = RightLeftKid.KID_HEIGHT / 2 * Math.ceil(Math.random() * 6);
		return super.createImage(x, y, counter, type);
	}
}