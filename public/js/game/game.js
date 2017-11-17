import { Model } from "model"

let Game = (function(){
    let that = {},
    lastTime = 0,
    model;

    that.init = function(){
        model = new Model();
    }

    that.gameLoop = function(time){
        if(lastTime === 0) lastTime = time;
        let timeDiff = time - lastTime;

        if(!model.gameOver()) requestAnimationFrame(that.gameLoop);
    }


    return that;
})()