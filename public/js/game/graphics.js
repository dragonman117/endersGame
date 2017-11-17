/**
 * Graphics.js
 *  A simple access point to our graphics
 **/

const PIXI = require('pixi.js');
const TiledMap = require('TiledMap');

let Graphics = new function () {

    const app = new PIXI.Application();
    PIXI.loader.use(TiledMap.middleware);
    let renderer = null;

    let init = function(initStage){
        document.body.appendChild(app.view);
        app.view.style.position="absolute";
        app.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage = initStage;
        app.start();
    };

    let renderStage = function(incomingStage){
        app.renderer.render(incomingStage);
    };

    return {
        "init": init,
        "renderStage":renderStage
    }
};