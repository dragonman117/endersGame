import { Model } from "/js/game/model.js"
import { KeyboardInputModule} from "/js/game/io/keyboard.js";
import { SoundsModule } from "/js/game/io/sounds.js";

let Game = (function(){
    let that = {},
    lastTime = 0,
    model;

    that.init = function(logicModel){
        model = new Model();
        model.init(logicModel);
        lastTime = performance.now();
        KeyboardInputModule.motivate.onStartTransmission(() => {
            annyang.start();
            console.log("m")
            SoundsModule.makeStatic();
        });

        KeyboardInputModule.motivate.onEndTransmission(() => {
            console.log("m STOP")
            annyang.abort();
        });
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