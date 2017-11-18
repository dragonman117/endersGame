/**
 * Stage object
 * Generates stages for the graphics class
 **/

import {Map} from "/js/game/map.js";

let Stage = function () {

    let genStage = function () {
        let paused = false;
        let updateController = NaN;
        let logical = NaN;

        let base = new PIXI.Stage();

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
            let resources = PIXI.loader.resources;
            let raw = resources[mapKey].data;
            let tilesets = resources[raw.spriteSheet].textures;
            logical = Map(raw.logical, raw.spriteSheet + ".level");
            for(let i = 0; i < raw.map.length; i++){
                for(let j = 0; j < raw.map[i].length; j++){
                    for(let k = 0; k < raw.map[i][j].tiles.length; k++){
                        let tile = new PIXI.Sprite(tilesets[raw.map[i][j].tiles[k]]);
                        tile.x = j*128;
                        tile.y = i*128 ;
                        base.addChild(tile);
                    }
                }
            }
        };

        base.getLogical = function () {
            return logical;
        };

        return base;
    };

    return {
        "genStage":genStage
    }
}();

export {Stage}