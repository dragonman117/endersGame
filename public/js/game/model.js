import { Battlefield } from "../objects/battlefield"

let Model = function(){
    let that = {},
        graphics,
        battlefield,
        playerUnits = [],
        creeps = [];

    that.init = function(g){
        graphics = g;
        battlefield = Battlefield();


    }

    that.gameOver = function(){ return false; }

    that.update = function(elapsedTime){

    }

    that.render = function(elapsedTime){

    }

    return that;
}

export { Model };