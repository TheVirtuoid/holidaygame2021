import Scene from "./Scene";
import HighScores from "../scoring/HighScores";

const legalKeys = [
	'KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE',
	'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ',
	'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO',
	'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT',
	'KeyU', 'KeyV', 'KeyW', 'KeyX', 'KeyY',
	'KeyZ', 'ArrowLeft', 'ArrowRight'
]

export default class NewHighScore extends Scene {

	html = `
		<div class="new-high-score">
			<h2>High Score!</h2>
			<input id="fake-input" type="text" maxlength="0" />
			<div id="initials">
				<span class="active" id="initial1">A</span>
				<span id="initial2">A</span>
				<span id="initial3">A</span>
			</div>
			<p>Use the arrow keys to move between initials.</p>
			<button type="button" id="save-high-score">Save</button>
		</div>`;

	#saveDom = null;
	#score = 0;
	#highScores = new HighScores();
	#pressedKeyBinding;
	#activeInitial;
	#initialContainer;
	#initials = [];
	#savedInitials = 'AAA';

	constructor(args) {
		super(args);
		this.#score = args?.score || 0;
		this.#pressedKeyBinding = this.pressedKey.bind(this);
	}

	asHtml(display = true) {
		super.asHtml(display);
		this.#activeInitial = 0;
		this.#initialContainer = document.getElementById('initials');
		this.#initials = this.#initialContainer.querySelectorAll('span');
		this.setActiveInitial();
		this.showInitials();
		const fakeInput = document.getElementById('fake-input');
		document.getElementById('save-high-score')
				.addEventListener('click', this.saveScore.bind(this));
		fakeInput.addEventListener('focus', this.setInitialFocus.bind(this));
		fakeInput.addEventListener('blur', this.clearInitialFocus.bind(this));
		fakeInput.addEventListener('keydown', this.pressedKey.bind(this));
		fakeInput.focus();
	}

	setActiveInitial() {
		this.#initials.forEach((initial) => initial.classList.remove('active'));
		this.#initials[this.#activeInitial].classList.add('active');
	}

	advanceActiveInitial(number) {
		this.#activeInitial += number;
		if (this.#activeInitial >= this.#initials.length) {
			this.#activeInitial = 0;
		} else if (this.#activeInitial < 0) {
			this.#activeInitial = this.#initials.length - 1;
		}
	}

	showInitials() {
		this.#initials.forEach((initial, index) => {
			initial.textContent = this.#savedInitials.charAt(index);
		});
	}

	getInitials() {
		let initials = '';
		this.#initials.forEach((initial) => {
			initials += this.#savedInitials.textContent;
		});
		return initials;
	}

	setInitialFocus() {
		this.#initialContainer.classList.add('in-focus');
	}

	clearInitialFocus() {
		this.#initialContainer.classList.remove('in-focus');
	}

	pressedKey(event) {
		const { code } = event;
		if (code === 'Tab') {
			return;
		}
		event.preventDefault();
		if (legalKeys.indexOf(code) !== -1) {
			if (code === 'ArrowLeft') {
				this.advanceActiveInitial(-1);
			} else {
				if (code !== 'ArrowRight') {
					this.#savedInitials = this.#savedInitials.substring(0, this.#activeInitial) +
							event.key.toUpperCase() +
							this.#savedInitials.substring(this.#activeInitial + 1);
				}
				this.advanceActiveInitial(1);
			}
			this.setActiveInitial();
			this.showInitials();
		}
	}

	saveScore(event) {
		this.#highScores.addScore(this.#savedInitials, this.#score);
		this.#highScores.sort();
		document.dispatchEvent(new CustomEvent('done-high-score'));
	}

	setScore(score) {
		this.#score = score;
	}
}