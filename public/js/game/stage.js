/**
 * Stage object
 * Generates stages for the graphics class
 **/

const PIXI = require('pixi.js');
const TiledMap = require('TiledMap');

let Stage = function (background) {
    let paused = false;
    let updateController = NaN;

    let base = PIXI.Stage(background);

    base.onUpdate = function(updateTrigger){
        updateController = updateTrigger;
    };

    base.update = function(){
        updateController();
    };

    base.pause = function(){
        paused = true;
    };

    base.resume = function () {
        paused = false;
    };

    base.isPaused = function () {
        return paused;
    };
    
    base.setMap = function (mapKey) {
        let map = new TiledMap(mapKey);
        base.addChild(map);
    };

    return base;
};