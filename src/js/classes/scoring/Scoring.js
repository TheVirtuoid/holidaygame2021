export default class Scoring {

	#currentHealth = 0;
	#currentScore = 0;
	#currentHighScore = 0;
	#healthScoreDom = null;
	#gameScoreDom = null;
	#highScoreDom = null;

	constructor(doms) {
		const { healthScoreDom, gameScoreDom, highScoreDom } = doms;
		this.#healthScoreDom = healthScoreDom;
		this.#gameScoreDom = gameScoreDom;
		this.#highScoreDom = highScoreDom;
		this.clearGameScore();
		this.clearHealthScore();
	}

	get healthScore () {
		return this.#currentHealth;
	}

	get gameScore () {
		return this.#currentScore;
	}

	set highScore (score) {
		this.#currentHighScore = score;
		if (this.#highScoreDom) {
			this.#highScoreDom.textContent = this.#currentHighScore;
		}
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