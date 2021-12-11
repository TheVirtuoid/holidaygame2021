import Main from "./scenes/Main.js";
import HighScore from "./scenes/HighScore.js";
import Instructions from "./scenes/Instructions.js";
import Play from "./scenes/Play.js";
import Config from "./utilities/config.js";
import GameOver from "./scenes/GameOver.js";

export default class Game {
	#main;
	#highScore;
	#instructions;
	#play;
	#gameOver;
	#rotatingScreens = new Map();
	#rotatingScreensOrder = Array.from(Config.ROTATING_SCREENS_ORDER);
	#rotatingScreensHandle;
	#actionButtonList = document.getElementById('action-list');
	#actionButtonStart = document.getElementById('action-start');
	#actionButtonPause = document.getElementById('action-pause');
	#actionButtonEnd = document.getElementById('action-end');
	#gameScoreDom = document.getElementById('game-score');
	#highScoreDom = document.getElementById('high-score');
	#healthScoreDom = document.getElementById('health-score');

	constructor(args) {
		const anchorPoint = Config.ANCHOR_POINT;
		const engine = args?.engine || null;
		this.#main = new Main({ anchorPoint });
		this.#instructions = new Instructions({ anchorPoint });
		this.#highScore = new HighScore({ anchorPoint });
		this.#gameOver = new GameOver({ anchorPoint });
		this.#play = new Play({
			anchorPoint,
			engine,
			gameScoreDom: this.#gameScoreDom,
			highScoreDom: this.#highScoreDom,
			healthScoreDom: this.#healthScoreDom
		});
		this.#rotatingScreens.set('main', this.#main);
		this.#rotatingScreens.set('instructions', this.#instructions);
		this.#rotatingScreens.set('high-score', this.#highScore);
		this.#actionButtonList.addEventListener('click', this.performAction.bind(this));

	}

	start() {
		this.startRotatingScreens();
	}

	startRotatingScreens() {
		this.showStartButton();
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

	gameOver(event) {
		this.showStartButton();
		this.#actionButtonStart.classList.add('hide');
		this.#gameOver.asHtml();
		setInterval(this.startRotatingScreens.bind(this),  Config.ROTATING_SCREENS_TIMER);
	}

	showStartButton() {
		this.#actionButtonStart.classList.remove('hide');
		this.#actionButtonPause.classList.add('hide');
		this.#actionButtonEnd.classList.add('hide');
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
				document.addEventListener('game-over', this.gameOver.bind(this), { once: true });
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