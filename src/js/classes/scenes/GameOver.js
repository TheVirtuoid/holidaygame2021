import Scene from "./Scene.js";

export default class GameOver extends Scene {

	html = `
		<div class="game-over">
			<p>Game</p>
			<p>Over</p>
		</div>`;

	constructor(args) {
		super(args)
	}
}