export default class Scoring {

	#currentHealth = 0;
	#currentScore = 0;
	#healthScoreDom = null;
	#gameScoreDom = null;

	constructor(doms) {
		const { healthScoreDom, gameScoreDom } = doms;
		this.#healthScoreDom = healthScoreDom;
		this.#gameScoreDom = gameScoreDom;
		this.clearGameScore();
		this.clearHealthScore();
	}

	get healthScore () {
		return this.#currentHealth;
	}

	get gameScore () {
		return this.#currentScore;
	}

	get stats () {
		return { score: this.gameScore, health: this.healthScore };
	}

	addGameScore(value) {
		this.#currentScore += value;
		if (this.#gameScoreDom) {
			this.#gameScoreDom.textContent = this.#currentScore;
		}
	}

	addHealthScore(value) {
		this.#currentHealth += value;
		if (this.#healthScoreDom) {
			this.#healthScoreDom.textContent = this.#currentHealth;
		}
	}

	clearGameScore() {
		this.addGameScore(this.#currentScore * -1);
	}

	clearHealthScore() {
		this.addHealthScore(this.#currentHealth * -1);
	}

}