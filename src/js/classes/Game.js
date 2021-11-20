import Main from "./scenes/Main.js";
import HighScore from "./scenes/HighScore.js";
import Instructions from "./scenes/Instructions.js";
import Play from "./scenes/Play.js";
import Config from "./utilities/config.js";

export default class Game {
	#main;
	#highScore;
	#instructions;
	#play;
	#rotatingScreens = new Map();
	#rotatingScreensOrder = Array.from(Config.ROTATING_SCREENS_ORDER);
	#rotatingScreensHandle;
	#actionButtonList = document.getElementById('action-list');
	#actionButtonStart = document.getElementById('action-start');
	#actionButtonPause = document.getElementById('action-pause');
	#actionButtonEnd = document.getElementById('action-end');

	constructor(args) {
		const anchorPoint = Config.ANCHOR_POINT;
		const engine = args?.engine || null;
		this.#main = new Main({ anchorPoint });
		this.#instructions = new Instructions({ anchorPoint });
		this.#highScore = new HighScore({ anchorPoint });
		this.#play = new Play({ anchorPoint, engine });
		this.#rotatingScreens.set('main', this.#main);
		this.#rotatingScreens.set('instructions', this.#instructions);
		this.#rotatingScreens.set('high-score', this.#highScore);
		this.#actionButtonList.addEventListener('click', this.performAction.bind(this));
	}

	start() {
		this.startRotatingScreens();
	}

	startRotatingScreens() {
		this.#rotatingScreensOrder = Array.from(Config.ROTATING_SCREENS_ORDER);
		this.rotateScreens();
		this.#rotatingScreensHandle = setInterval(this.rotateScreens.bind(this), Config.ROTATING_SCREENS_TIMER);
	}

	stopRotatingScreens() {
		clearInterval(this.#rotatingScreensHandle);
	}

	rotateScreens() {
		const screen = this.#rotatingScreensOrder.shift();
		this.#rotatingScreens.get(screen).asHtml();
		this.#rotatingScreensOrder.push(screen);
	}

	performAction(event) {
		const action = event.target.id;
		switch (action) {
			case 'action-start':
				this.stopRotatingScreens();
				this.#actionButtonStart.classList.add('hide');
				this.#actionButtonPause.classList.remove('hide');
				this.#actionButtonEnd.classList.remove('hide');
				this.#main.asHtml(false);
				this.#play.start();
				break;
			case 'action-pause':
				if (this.#actionButtonPause.textContent === 'Resume') {
					this.#actionButtonPause.textContent = 'Pause';
				} else {
					this.#actionButtonPause.textContent = 'Resume';
				}
				break;
			case 'action-end':
				this.#actionButtonStart.classList.remove('hide');
				this.#actionButtonPause.classList.add('hide');
				this.#actionButtonEnd.classList.add('hide');
				this.startRotatingScreens();
				break;
			default:
				break;
		}
	}
}