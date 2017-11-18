/**
 * Loader.js
 * Entry point that creates and inits our game.
 */

import {Graphics} from "/js/game/graphics.js";
import {Stage} from "/js/game/stage.js";
import {loader} from "/js/toLoad.js";

let initGame = function () {
    console.log("I ran");
    let startStage = Stage.genStage();
    startStage.setMap("level-1.map");
    Graphics.init(startStage);
};

for(let i = 0; i < loader.length; i++){
    PIXI.loader.add(loader[i][0], loader[i][1]);
}

PIXI.loader.load(initGame);
