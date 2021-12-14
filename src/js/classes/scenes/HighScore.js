import Scene from "./Scene.js";
import HighScores from "../scoring/HighScores.js";

export default class HighScore extends Scene {

	html = `
		<div class="high-score">
			<h2>HighScores</h2>
			<ol></ol>
		</div>`;
	#highScores = null;
	constructor(args) {
		super(args);
		this.#highScores = new HighScores('.high-score ol');
	}

	asHtml(display = true) {
		super.asHtml(display);
		if (display) {
			this.#highScores.load();
			this.#highScores.list();
		}
	}
}