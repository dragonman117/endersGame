

let Sprite = function (fileName) {

    let sprite = PIXI.loader.resources[filename].texture;

    let updatePosition = function (x, y) {
        sprite.anchor.x = 0.0;
        spirte.anchor.y = 0.0;
        spirte.x = x;
        sprite.y = y;
    };

    //Note that rotation value apears to be between 0 and 1 (0 be no rotation and 1  being full 360)
    //https://github.com/kittykatattack/learningPixi#rotation
    let rotate = function (fullRotationValue) {
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.rotation = fullRotationValue;
    };

    return {
        "updatePosition":updatePosition,
        "rotate":rotate
    };
};

export { Sprite };