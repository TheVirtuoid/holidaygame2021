import Main from "./scenes/Main.js";

export default class Game {
	main;
	#rotationScreens = ['main', 'high-score', 'instructions'];


	constructor() {
		const anchorPoint = 'pitch';
		this.main = new Main({ anchorPoint });
	}

	initialize() {}

	start() {
		this.main.asHtml();
	}

	stop() {}

	pause() {}

	rotateScenes() {}

}