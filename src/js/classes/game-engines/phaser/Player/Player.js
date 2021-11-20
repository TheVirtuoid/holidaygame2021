import StNicholas from "./Avatars/StNicholas.js";
import Krampus from "./Avatars/Krampus.js";

export default class Player {
	#stnick = new StNicholas();
	#krampus = new Krampus();

	constructor() {}

	get imageData () {
		return [
			this.#stnick.imageData,
			this.#krampus.imageData
		]
	}

	get tagStNick () {
		return this.#stnick.imageData.tag;
	}
}