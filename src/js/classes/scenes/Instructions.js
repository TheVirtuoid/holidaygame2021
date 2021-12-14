import Scene from "./Scene.js";

export default class Instructions extends Scene {

	html = `
		<div class="instructions">
			<h2>Instructions</h2>
			<ul>
				<li>Give presents to Nice kids, coal to Naughty kids.</li>
				<li>St. Nicholas gives presents, Krampus gives coal.</li>
				<li>You move St. Nicholas and Grampus by using the Arrow keys.</li>
				<li>Use the 'Z' key to shoot presents, 'C' key to shoot coal.</li>
				<li>Nice kids have greens shirts, Naughty kids have yellow shirts.</li>
				<li>You get one Game point for each Present or Coal delivered.</li>
				<li>You lose five Health points if a Nice kid gets coal, or a Naughty kid gets a present.</li>
				<li>You lose one Health point if a kid doesn't get a present.</li>
				<li>The game ends when your Health reaches 0.</li>
			</ul>
		</div>`;
	constructor(args) {
		super(args)
	}
}