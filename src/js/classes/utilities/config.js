export default class Config {
	static WIDTH = 320;
	static HEIGHT = 400;
	static ROTATING_SCREENS_TIMER = 5000;
	static ROTATING_SCREENS_ORDER = ['main', 'high-score', 'instructions'];
	static GAME_OVER_TIMER = 3000;
	static ANCHOR_POINT = 'pitch';
	static PLAYER_SPEED = 7;
	static AMMO_SPEED = 750;
	static KID_SPEED = 50;
	static SCORE_GOOD_HIT = 1;
	static SCORE_BAD_HIT = -5;
	static SCORE_BOUNDARY_HIT = -1;
	static STARTING_HEALTH = 20;
	static HIGH_SCORE_KEY = 'krampus-night-high-scores';
}