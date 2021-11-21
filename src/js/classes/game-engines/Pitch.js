import Config from "../utilities/config.js";

export default class Pitch {
	config = {
		height: Config.HEIGHT,
		width: Config.WIDTH,
		engine: null
	};
	#engine = null;
	#field = null;

	constructor(config) {
		this.config = { ...this.config, ...config };
		if (this.config.engine) {
			this.#field = new this.config.engine(this.config);
		}
	}

}