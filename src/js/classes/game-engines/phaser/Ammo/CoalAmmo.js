import Ammo from "./Ammo.js";

export default class CoalAmmo extends Ammo {

	static COALAMMO_HEIGHT = 18;
	static COALAMMO_WIDTH = 20;

	constructor() {
		super({ tag: 'coal', name: '/img/bag-of-coal-2.png' });
	}
}