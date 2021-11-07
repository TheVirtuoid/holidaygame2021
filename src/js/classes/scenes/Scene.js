import Phaser from "phaser";
import Config from "../utilities/config.js";

export default class Scene {
	type = Phaser.AUTO;
	width = Config.WIDTH;
	height = Config.HEIGHT;
	scene = null;
	anchorPoint = null;
	html = '';

	constructor (args) {
		this.type = args?.type || Phaser.AUTO;
		this.width = args?.width || Config.WIDTH;
		this.height = args?.height || Config.HEIGHT;
		this.scene = null;
		this.anchorPoint = args?.anchorPoint || 'pitch';
	}

	preload () {}

	create () {}

	update () {}

	asHtml () {
		const anchorPointDom = document.getElementById(this.anchorPoint);
		while(anchorPointDom.firstChild) {
			anchorPointDom.removeChild(anchorPointDom.firstChild);
		}
		anchorPointDom.insertAdjacentHTML('afterbegin', this.html);
	}

}