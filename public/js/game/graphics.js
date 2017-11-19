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
    let shapes = [];
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
    
    that.drawLine = function (stPt, endPt, color, size) {
        let line = new PIXI.Graphics();
        line.lineStyle(size, color);
        line.moveTo(stPt[0], stPt[1]);
        line.lineTo(endPt[0], endPt[1]);
        // pGraphics.endFill();
        app.stage.addChild(line);
        shapes.push(line);
    };

    that.drawRect = function(stX, stY, size, color, alpha){
        let square = new PIXI.Graphics();
        square.beginFill(color);
        square.alpha = alpha;
        square.drawRect(stX, stY, size, size);
        square.endFill();
        shapes.push(square);
        app.stage.addChild(square);
    };
    
    that.text = function (content, x, y) {
        let style = new PIXI.TextStyle({
            fill:['#FFFFFF'],
            fontSize: 60
        });
        let txt = new PIXI.Text(content, style);
        txt.x = x;
        txt.y = y;
        shapes.push(txt);
        app.stage.addChild(txt);
    };

    that.drawGrid = function () {
        let color = 0x000000;
        let size = 5;
        let xStart = 1408;
        let yStart = 128;
        for(let i = 0; i < 26; i++){
            for(let j = 0; j < 26; j++){
                if(j%2 == 0){
                    this.drawRect(xStart + j*128, yStart + i * 128, 128, color, .07);
                }
            }
        }
        for(let i = 0; i < 26; i++){
            for(let j = 0; j < 26; j++){
                if(i%2 == 0){
                    this.drawRect(xStart + j*128, yStart + i * 128, 128, color, .07);
                }
            }
        }
        let stLetter = 'A';
        for(let i = 0; i < 26; i++){
            this.text((String.fromCharCode(stLetter.charCodeAt(0) + i)), (xStart + i*128)+40, 50);
        }
        for(let i =0 ; i < 26; i++){
            this.text(""+(i+1), 1320, 128 + (i*128)+ 40);
        }
    };

    that.getLogical = function () {
        return app.stage.getLogical();
    };

    return that;
}();
export {Graphics};