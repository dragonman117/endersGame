/**
 * Tiled map
 * a simple helper to read in a Tiled json map to pixi.js
 */

let TiledMap = function (mapPath) {

    let getImageObjects = function(tiles){
        let res = {};
        for(let i = 0; i < Object.keys(tiles).length; i++){
            // console.log(id);
            res[i+1] = /\/([\w]+).png$/.exec(tiles[i].image)[1];
        }
        return res;
    };

    let buildGrid = function (map, layer, tiles) {
        for(let i = 0; i < map.length; i++){
            let width = map[i].length;
            for(let j = 0; j < width; j++){
                let idx = (width * i) + j;
                if(layer[idx] != 0){
                    map[i][j].tiles.push(tiles[layer[idx]]);
                }
            }
        }
        return map;
    };

    let middleware = function(resource, next){
        if (!(/(.map.json)$/.test(resource.url))) return next();
        let raw = resource.data;
        let spriteSheet = raw.properties.spriteSheet;
        let tiles = getImageObjects(raw.tilesets[0].tiles);
        let w = raw.width;
        let h = raw.height;
        let map = [];
        for(let i = 0; i < h; i++){
            map.push([]);
            for(let j = 0; j < w; j++){
                map[i].push({tiles:[]});
            }
        }
        for(let i = 0; i < Object.keys(raw.layers).length; i++){
            map = buildGrid(map, raw.layers[i].data, tiles);
        }
        let logical = [];
        for(let i = 1; i < 26+1; i++){
            logical.push([]);
            for (let j = 11; j < (11 + 26); j++){
                let tmp = JSON.parse(JSON.stringify(map[i][j]));
                if(tmp.tiles.length > 2){
                    tiles.state = "invalid";
                }else{
                    tiles.state = "open";
                }
                logical[i-1].push(tmp);
            }
        }
        console.log(logical);
        resource.data = {"spriteSheet":spriteSheet, "map":map};
        next();
    };

    let setup = function () {
        console.log("Im viable");
    };


    return{
        "middleware":middleware,
        "setup":setup
    }
}();

export {TiledMap};