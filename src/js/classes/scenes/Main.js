import Scene from "./Scene.js";

export default class Main extends Scene {

	html = `
		<div class="main">
			<p>Krampus</p>
			<p>Night</p>
			<p>&copy; 2021 m.parker smith a.k.a. TheVirtuoid</p>
		</div>`

	constructor(args) {
		super(args);
	}

}