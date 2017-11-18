/**
 * Graphics.js
 *  A simple access point to our graphics
 **/

import {TiledMap} from "/js/lib/TiledMap.js";


let Graphics = new function () {

    const app = new PIXI.Application();
    let renderer = null;
    PIXI.loader.use(TiledMap.middleware);

    let init = function(initStage){
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

    let renderStage = function(incomingStage){
        app.renderer.render(incomingStage);
    };

    return {
        "init": init,
        "renderStage":renderStage
    }
}();
export {Graphics};