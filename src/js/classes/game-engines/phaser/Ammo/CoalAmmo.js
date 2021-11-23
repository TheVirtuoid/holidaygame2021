import Ammo from "./Ammo.js";
import Coal from "../Avatars/Coal.js";

export default class CoalAmmo extends Ammo {

	static COALAMMO_HEIGHT = 18;
	static COALAMMO_WIDTH = 20;

	constructor() {
		super({ image: Coal });
	}
}