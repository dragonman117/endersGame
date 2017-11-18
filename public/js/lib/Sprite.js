

let Sprite = function (fileName, graphics) {
    let sprite = new PIXI.Sprite(PIXI.loader.resources[fileName].texture);

    let updatePosition = function (x, y) {
        sprite.anchor.x = 0.0;
        sprite.anchor.y = 0.0;
        sprite.x = x;
        sprite.y = y;
    };

    //Note that rotation value apears to be between 0 and 1 (0 be no rotation and 1  being full 360)
    //https://github.com/kittykatattack/learningPixi#rotation
    let rotate = function (fullRotationValue) {
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.rotation = fullRotationValue;
    };

    let init = function (x, y, rotation) {
        updatePosition(x, y);
        rotate(rotation);
        graphics.addSprite(sprite);
    };

    return {
        "updatePosition":updatePosition,
        "rotate":rotate,
        "init":init
    };
};

export { Sprite };