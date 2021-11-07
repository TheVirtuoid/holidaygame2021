import Game from "./classes/Game.js";

const game = new Game();
game.start();

/*
import Phaser from 'phaser';
import youTubeImage from './../img/youTubeImage.png';

class KrampusNightGame extends Phaser.Scene {
	constructor() {
		super();
	}

	preload () {
		this.load.image('logo', youTubeImage);
	}

	create () {
		const logo = this.add.image(400, 140, 'logo');
		this.tweens.add({
			targets: logo,
			y: 450,
			duration: 2000,
			ease: "Power2",
			yoyo: true,
			loop: -1
		})
	}
}
const config = {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 600,
	scene: KrampusNightGame
}
const game = new Phaser.Game(config);
console.log('it works!');
*/
