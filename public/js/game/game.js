import { Model } from "model"

let Game = (function(){
    let that = {},
    lastTime = 0,
    model;

    that.init = function(){
        model = new Model();

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

    return that;
})()