/**
 * Graphics.js
 *  A simple access point to our graphics
 **/

import {TiledMap} from "/js/lib/TiledMap.js";
import {Sprite} from "/js/lib/Sprite.js";


let Graphics = new function () {
    let that = {};
    const app = new PIXI.Application();
    let renderer = null;
    PIXI.loader.use(TiledMap.middleware);

    that.init = function(initStage){
        app.view.style.position="absolute";
        app.view.style.display = "block";
        // app.view.style.width = "100%";
        app.renderer = PIXI.autoDetectRenderer(
            (48 * 128), (27*128),
            {antialias: false, transparent: false, resolution: .5}
        );
        app.stage = initStage;
        document.body.appendChild(app.renderer.view);
        app.start();
    };

    that.renderStage = function(incomingStage){
        app.renderer.render(incomingStage);
    };

    that.addSprite = function (sprite) {
        app.stage.addChild(sprite);
    };

    that.genSprite = function(name){
        return Sprite(name, that);
    };

    return that;
}();
export {Graphics};