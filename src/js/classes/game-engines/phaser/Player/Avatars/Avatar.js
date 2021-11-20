export default class Avatar {
	#tag = '';
	#name = '';
	constructor(args) {
		this.#tag = args?.tag || this.#tag;
		this.#name = args?.name || this.#name;
	}

	get imageData () {
		return { tag: this.#tag, name: this.#name }
	}

}