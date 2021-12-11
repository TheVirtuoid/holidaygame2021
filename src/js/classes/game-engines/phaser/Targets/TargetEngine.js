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
	#rightLeftChild = new RightLeftKid(Kid.KID_TYPE_NICE);
	#rightLeftChildNaughty = new RightLeftKid(Kid.KID_TYPE_NAUGHTY);
	#leftRightChild = null;
	#player = null;
	#childGroup = null;
	#colliderMap = new Map();
	#coalAmmo = null;
	#presentAmmo = null;
	#collisionCoal = null;
	#collisionPresent = null;

	#kidCounter = 40;
	#score = null;
	#gameOver = false;

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
				this.processCollision(Player.COAL, kid, Kid.KID_TYPE_NAUGHTY);
			});
		}
	}

	setCollisionPresent() {
		if (!this.#collisionPresent) {
			this.#collisionPresent = this.#scene.physics.add.collider(this.#player.present.image, this.#childGroup, (coal, kid) => {
				this.processCollision(Player.PRESENT, kid, Kid.KID_TYPE_NICE)
			});
		}
	}

	processCollision(collisionType, kid, kidTypeComparison) {
		this.#player.ceaseFire(collisionType);
		if (kid.getData('kid').type == kidTypeComparison) {
			this.#score.addGameScore(Config.SCORE_GOOD_HIT);
		} else {
			this.#score.addHealthScore(Config.SCORE_BAD_HIT);
		}
		this.removeTarget(kid);
	}

	load(scene) {
		this.#scene = scene;
		this.#childGroup = this.#scene.physics.add.group({ allowGravity: false });
		this.#rightLeftChild.load(scene);
		this.#rightLeftChildNaughty.load(scene);
	}

	start(player) {
		this.#targets.clear();
		this.#score.clearGameScore();
		this.#score.clearHealthScore();
		this.#score.addHealthScore(Config.STARTING_HEALTH);
		this.#gameOver = false;
		setTimeout(this.newTarget.bind(this), this.#timing);
	}

	newTarget() {
		this.#timing -= 50;
		this.#counter++;
		const type = Math.random() >= .5 ? Kid.KID_TYPE_NAUGHTY : Kid.KID_TYPE_NICE;
		const kidType = type === Kid.KID_TYPE_NICE ? this.#rightLeftChild : this.#rightLeftChildNaughty;
		const speed = Config.KID_SPEED * kidType.getDirection() * Math.ceil(Math.random() * 5);

		const kid = new KidImage({
			kid: kidType,
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
		kid.destroy();
		this.#targets.delete(targetKid);
	}

	checkCollisions() {
		this.#targets.forEach((kid) => {
			const collisions = kid.checkCollision();
			if (collisions.wall) {
				kid.stop();
				kid.getImage().destroy();
				this.#targets.delete(kid);
				this.#score.addHealthScore(Config.SCORE_BOUNDARY_HIT);
			}
		});
	}

	stop () {
		this.#gameOver = true;
	}

	update() {
		if (this.#score.healthScore <= 0) {
			this.stop();
		}
		this.checkCollisions();
	}

	isGameOver() {
		return this.#gameOver;
	}
}