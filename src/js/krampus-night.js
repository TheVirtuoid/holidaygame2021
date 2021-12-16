import Game from "./classes/Game.js";
import PhaserGame from "./classes/game-engines/phaser/PhaserGame.js";

const game = new Game({ engine: PhaserGame });
game.start();

