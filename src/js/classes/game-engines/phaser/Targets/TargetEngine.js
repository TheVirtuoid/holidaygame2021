import RightLeftKid from "../Kids/RightLeftKid.js";
import LeftRightKid from "../Kids/LeftRightKid.js";
import Kid from "../Kids/Kid.js";
import KidImage from "../Kids/KidImage.js";
import Config from "../../../utilities/config.js";
import Player from "../Player/Player.js";
import Scoring from "../../../scoring/Scoring.js";

export default class TargetEngine {

	#targets = new Set();
	#timing = 2000;
	#scene = null;
	#counter = 0;
	#rightLeftChild = new RightLeftKid(Kid.KID_TYPE_NICE);
	#rightLeftChildNaughty = new RightLeftKid(Kid.KID_TYPE_NAUGHTY);
	#leftRightChild = new LeftRightKid(Kid.KID_TYPE_NICE);
	#leftRightChildNaughty = new LeftRightKid(Kid.KID_TYPE_NAUGHTY);
	#player = null;
	#childGroup = null;
	#colliderMap = new Map();
	#coalAmmo = null;
	#presentAmmo = null;
	#collisionCoal = null;
	#collisionPresent = null;
	#ding;
	#buzz;

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
			this.#ding.play();
			this.#score.addGameScore(Config.SCORE_GOOD_HIT);
		} else {
			this.#buzz.play();
			this.#score.addHealthScore(Config.SCORE_BAD_HIT);
		}
		this.removeTarget(kid);
	}

	load(scene) {
		this.#scene = scene;
		this.#childGroup = this.#scene.physics.add.group({ allowGravity: false });
		this.#rightLeftChild.load(scene);
		this.#rightLeftChildNaughty.load(scene);
		this.#leftRightChild.load(scene);
		this.#leftRightChildNaughty.load(scene);
		this.#scene.load.audio('ding', ['/audio/ding.wav']);
		this.#scene.load.audio('buzz', ['/audio/buzz.mp3']);
	}

	start(player) {
		this.#targets.clear();
		this.#score.clearGameScore();
		this.#score.clearHealthScore();
		this.#score.addHealthScore(Config.STARTING_HEALTH);
		this.#gameOver = false;
		this.#ding = this.#scene.sound.add('ding', { loop: false });
		this.#buzz = this.#scene.sound.add('buzz', { loop: false });
		setTimeout(this.newTarget.bind(this), this.#timing);
	}

	newTarget() {
		if (!this.#gameOver) {
			this.#timing = Math.max(500, this.#timing - 10);
			const kidDirection = Math.random();
			const type = Math.random() >= .5 ? Kid.KID_TYPE_NAUGHTY : Kid.KID_TYPE_NICE;
			let kidType;
			if (Math.random() >= .5) {
				kidType = type === Kid.KID_TYPE_NICE ? this.#rightLeftChild : this.#rightLeftChildNaughty;
			} else  {
				kidType = type === Kid.KID_TYPE_NICE ? this.#leftRightChild : this.#leftRightChildNaughty;
			}
			const speed = Config.KID_SPEED * kidType.getDirection() * Math.ceil(Math.random() * 5);
			const kid = new KidImage({
				kid: kidType,
				counter: this.#counter++,
				type,
				speed
			});
			this.#targets.add(kid);
			this.#childGroup.add(kid.getImage());
			kid.run();
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
			this.#score.addHealthScore(this.#score.healthScore * -1);
			this.stop();
		}
		this.checkCollisions();
	}

	isGameOver() {
		return this.#gameOver;
	}

	getScore() {
		return this.#score.gameScore;
	}
}