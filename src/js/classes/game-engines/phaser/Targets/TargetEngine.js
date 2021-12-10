import RightLeftKid from "../Kids/RightLeftKid.js";
import Kid from "../Kids/Kid.js";
import KidImage from "../Kids/KidImage.js";
import Config from "../../../utilities/config.js";
import Player from "../Player/Player.js";
import Scoring from "../../../scoring/Scoring.js";

export default class TargetEngine {

	#targets = new Set();
	#timing = 5000;
	#scene = null;
	#counter = 0;
	#rightLeftChild = new RightLeftKid();
	#leftRightChild = null;
	#player = null;
	#childGroup = null;
	#colliderMap = new Map();
	#coalAmmo = null;
	#presentAmmo = null;
	#collisionCoal = null;
	#collisionPresent = null;

	#kidCounter = 15;
	#score = null;

	constructor(player, scoring) {
		this.#player = player;
		this.#player.setTargetEngine(this);
		const { highScoreDom, gameScoreDom, healthScoreDom } = scoring;
		this.#score = new Scoring({ highScoreDom, gameScoreDom, healthScoreDom });
	}

	get kidGroup () {
		return this.#childGroup;
	}

	setCollisionCoal() {
		if (!this.#collisionCoal) {
			this.#collisionCoal = this.#scene.physics.add.collider(this.#player.coal.image, this.#childGroup, (coal, kid) => {
				this.removeTarget(kid);
				this.#player.ceaseFire(Player.COAL);
				this.#score.addGameScore(1);
			});
		}
	}

	setCollisionPresent() {
		if (!this.#collisionPresent) {
			this.#collisionPresent = this.#scene.physics.add.collider(this.#player.present.image, this.#childGroup, (coal, kid) => {
				this.removeTarget(kid);
				this.#player.ceaseFire(Player.PRESENT);
				this.#score.addGameScore(1);
			});
		}
	}

	load(scene) {
		this.#scene = scene;
		this.#childGroup = this.#scene.physics.add.group({ allowGravity: false });
		this.#rightLeftChild.load(scene);
	}

	start(player) {
		this.#timing = 1000;
		this.#targets.clear();
		setTimeout(this.newTarget.bind(this), this.#timing);
	}

	newTarget() {
		this.#timing -= 50;
		this.#counter++;
		const type = Math.random() >= .5 ? Kid.KID_TYPE_NAUGHTY : Kid.KID_TYPE_NICE;
		const speed = Config.KID_SPEED * this.#rightLeftChild.getDirection() * Math.floor(Math.random() * 5);

		const kid = new KidImage({
			kid: this.#rightLeftChild,
			counter: this.#counter,
			type,
			speed
		});
		this.#targets.add(kid);
		this.#childGroup.add(kid.getImage());
		kid.run();
		this.#kidCounter--;
		if (this.#kidCounter > 0) {
			setTimeout(this.newTarget.bind(this), this.#timing);
		}
	}

	removeTarget(kid) {
		const targetKid = kid.getData('kid');
		targetKid.stop();
		this.#targets.delete(targetKid);
	}

	checkCollisions() {
		this.#targets.forEach((kid) => {
			const collisions = kid.checkCollision();
			if (collisions.wall) {
				kid.stop();
				this.#targets.delete(kid);
//				const kidCollision = this.#colliderMap.get(kid);
//				kidCollision.collisionCoal.destroy();
//				kidCollision.collisionPresent.destroy();
//				this.#colliderMap.delete(kid);
			}
		});
	}

	update() {
		this.checkCollisions();
	}
}