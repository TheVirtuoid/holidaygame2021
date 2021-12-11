import Scene from "./Scene.js";

export default class Play extends Scene {

	#highScoreDom;
	#gameScoreDom;
	#healthScoreDom;

	constructor (args) {
		super(args);
		this.#gameScoreDom = args.gameScoreDom;
		this.#highScoreDom = args.highScoreDom;
		this.#healthScoreDom = args.healthScoreDom;
	}

	start() {
		this.asPlayingField({
			gameScoreDom: this.#gameScoreDom,
			highScoreDom: this.#highScoreDom,
			healthScoreDom: this.#healthScoreDom
		});
	}

	stop () {

	}

	pause () {

	}

}