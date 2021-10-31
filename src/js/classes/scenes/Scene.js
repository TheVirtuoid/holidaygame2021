import Phaser from "phaser";

export default class Scene {
	type = Phaser.AUTO;
	width = 800;
	height = 600;
	scene = null;
	anchorPoint = null;

	constructor (args) {
		this.type = args?.type || Phaser.AUTO;
		this.width = args?.width || 800;
		this.height = args?.height || 600;
		this.scene = null;
		this.anchorPoint = args?.anchorPoint || 'game';
	}

	preload () {}

	create () {}

	update () {}
}