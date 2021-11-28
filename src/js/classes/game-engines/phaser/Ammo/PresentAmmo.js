import Ammo from "./Ammo.js";

export default class PresentAmmo extends Ammo {

	static PRESENTAMMO_HEIGHT = 21;
	static PRESENTAMMO_WIDTH = 20;

	constructor() {
		super({ tag: 'present', name: '/img/present-2.png' });
	}
}