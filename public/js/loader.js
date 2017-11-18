/**
 * Loader.js
 * Entry point that creates and inits our game.
 */

import {Graphics} from "/js/game/graphics.js";
import {Stage} from "/js/game/stage.js";


//For Testing only!!!!
console.log("I ran");

let initGame = function () {
    let startStage = Stage.genStage();
    startStage.setMap("TestMap");
    Graphics.init(startStage);
};

PIXI.loader.load(initGame);
