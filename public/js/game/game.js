import { Model } from "/js/game/model.js"

let Game = (function(){
    let that = {},
    lastTime = 0,
    model;

    that.init = function(){
        model = new Model();
        model.init();
        lastTime = performance.now();
    }

    that.gameLoop = function(time){
        let timeDiff = time - lastTime;
        lastTime = time;
        that.update(timeDiff)
        if(!model.gameOver()) requestAnimationFrame(that.gameLoop);
    }

    that.handleInput = function(elapsedTime){
        model.handleInput(elapsedTime);
    }

    that.render = function(elapsedTime){
        model.render(elapsedTime);
    }

    that.update = function(elapsedTime){
        model.update(elapsedTime);
    }

    return that;
})()

export {Game};