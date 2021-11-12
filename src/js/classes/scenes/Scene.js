import PhaserDriver from "./drivers/PhaserDriver.js";
import Config from "../utilities/config.js";

export default class Scene {
	width = Config.WIDTH;
	height = Config.HEIGHT;
	scene = null;
	anchorPoint = null;
	html = '';
	driver = null;

	constructor (args) {
		this.width = args?.width || Config.WIDTH;
		this.height = args?.height || Config.HEIGHT;
		this.scene = null;
		this.anchorPoint = args?.anchorPoint || 'pitch';
		this.driver = new PhaserDriver(this.toConfig());
	}

	toConfig() {
		return {
			width: this.width,
			height: this.height,
			anchorPoint: this.anchorPoint,
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
		this.scene = this.driver.createScene();
	}

	asHtml (display = true) {
		const anchorPointDom = document.getElementById(this.anchorPoint);
		while(anchorPointDom.firstChild) {
			anchorPointDom.removeChild(anchorPointDom.firstChild);
		}
		if (display) {
			anchorPointDom.insertAdjacentHTML('afterbegin', this.html);
		}
	}

}