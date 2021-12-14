import PhaserGame from "../game-engines/phaser/PhaserGame.js";
import Config from "../config.js";
import Pitch from "../pitch/Pitch.js";

export default class Scene {
	#width = Config.WIDTH;
	#height = Config.HEIGHT;
	scene = null;
	#anchorPoint = Config.ANCHOR_POINT;
	html = '';
	#engine = null;
	#pitch = null;
	#highScoreDom = null;
	#gameScoreDom = null;
	#healthScoreDom = null;

	constructor (args) {
		this.#width = args?.width || this.#width;
		this.#height = args?.height || this.#height;
		this.#anchorPoint = args?.anchorPoint || this.#anchorPoint;
		this.#engine = args?.engine || this.#engine;
		this.#gameScoreDom = args?.gameScoreDom || this.#gameScoreDom;
		this.#highScoreDom = args?.highScoreDom || this.#highScoreDom;
		this.#healthScoreDom = args?.healthScoreDom || this.#healthScoreDom;
	}

	toConfig() {
		return {
			width: this.#width,
			height: this.#height,
			anchorPoint: this.#anchorPoint,
			engine: this.#engine,
			parent: this.#anchorPoint,
			gameScoreDom: this.#gameScoreDom,
			highScoreDom: this.#highScoreDom,
			healthScoreDom: this.#healthScoreDom,
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 300 },
					debug: false
				}
			}
		};
	}

	asPlayingField () {
		this.#pitch = new Pitch(this.toConfig());
	}

	asHtml (display = true) {
		const anchorPointDom = document.getElementById(this.#anchorPoint);
		while(anchorPointDom.firstChild) {
			anchorPointDom.removeChild(anchorPointDom.firstChild);
		}
		if (display) {
			anchorPointDom.insertAdjacentHTML('afterbegin', this.html);
		}
	}

}