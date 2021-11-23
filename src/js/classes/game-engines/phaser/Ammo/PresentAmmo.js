import Ammo from "./Ammo.js";
import Present from "../Avatars/Present.js";

export default class PresentAmmo extends Ammo {

	static PRESENTAMMO_HEIGHT = 21;
	static PRESENTAMMO_WIDTH = 20;

	constructor() {
		super({ image: Present });
	}
}