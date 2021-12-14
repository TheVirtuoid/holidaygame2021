import Config from "../utilities/config";

export default class HighScores {
	#domSelector;
	#highScores = [];

	constructor(domSelector) {
		this.#domSelector = domSelector;
		this.load();
	}

	load() {
		const items = localStorage.getItem(Config.HIGH_SCORE_KEY);
		if (!items) {
			this.#highScores = [
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 },
				{ name: 'AAA', score: 0 }
			];
			this.save();
		} else {
			this.#highScores = JSON.parse(items);
		}
		this.sort();
	}

	save() {
		localStorage.setItem(Config.HIGH_SCORE_KEY, JSON.stringify(this.#highScores));
	}

	addScore(initials, score) {
		this.#highScores.push({ name: initials, score });
		this.sort();
		this.#highScores.pop();
		this.save();
	}

	isHighScore(score) {
		return this.#highScores[this.#highScores.length - 1].score < score;
	}

	sort() {
		this.#highScores.sort( (a, b) => {
			return b.score - a.score;
		});
	}

	list() {
		this.sort();
		const dom = document.querySelector(this.#domSelector);
		if (dom) {
			let list = '';
			this.#highScores.forEach( (item) => {
				list = `${list}<li><div><span>${item.name}</span><span>${item.score}</span></div></li>`;
			});
			while(dom.firstChild) dom.removeChild(dom.firstChild);
			dom.insertAdjacentHTML('afterbegin', list);
		}
	}

	getHighestScore() {
		this.load();
		return this.#highScores[0];
	}
}