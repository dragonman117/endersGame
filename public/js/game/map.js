
let Map = function (logical, levelName) {
    let logicalRepresentation = logical;
    let level = PIXI.loader.resources[levelName].data;
    //offsets from 0,0 for the board
    let xOffset = 1408;
    let yOffset = 128;
    let openentGates;
    let playerGates;

    let gridToPixel = function (gridPos) {
        let x = gridPos[0].charCodeAt(0) - "A".charCodeAt(0) + 1;
        let y = parseInt(gridPos.slice(1,gridPos.length));
        return [x*128 + xOffset, y*128 + yOffset];
    };

    let getLogicalPos = function (gridPos) {
        let x = gridPos[0].charCodeAt(0) - "A".charCodeAt(0);
        let y = parseInt(gridPos.slice(1,gridPos.length));
        return [x, y-1];
    };

    let getMap = function () {
        return JSON.parse(JSON.stringify(logicalRepresentation))
    };

    let getState = function (gridPos) {
        let pos = getLogicalPos(gridPos);
        return logicalRepresentation[pos[0]][pos[1]].state;
    };

    let setState = function (gridPos, cellState) {
        let pos = getLogicalPos(gridPos);
        logicalRepresentation[pos[0]][pos[1]].state = cellState;
    };

    let parseGate = function () {
        let gate = [];
        for(let i = 0; i < level.oponentGate.length; i++){
            let specGate = {};
            specGate.location = level.oponentGate[i];
            specGate.path = level.creepPaths[i];
            specGate.spawn = level.creepSpawns[i];
            gate.push(specGate);
        }
        return gate;
    };

    let getOpponentGates = function () {
        return openentGates;
    };

    let getPlayerGates = function () {
        return playerGates;
    };

    let getSpawnRate = function () {
        return level.spawnRate;
    };

    let setOccupied = function (owner, gridPos) {
        pos = getLogicalPos(gridPos);
        logicalRepresentation[pos[0]][pos[1]].owner = owner;
        logicalRepresentation[pos[0]][pos[1]].state = "full";
    };

    let setEmpty = function (gridPos) {
        pos = getLogicalPos(gridPos);
        logicalRepresentation[pos[0]][pos[1]].owner = "";
        logicalRepresentation[pos[0]][pos[1]].state = "open";
    };

    openentGates = parseGate();
    playerGates = level.playerGate;
    return {
        "gridToPixel":gridToPixel,
        "getMap":getMap,
        "getState":getState,
        "setState":setState,
        "getOpponentGates":getOpponentGates,
        "getPlayerGates":getPlayerGates,
        "getSpawnRate":getSpawnRate,
        "setOccupied":setOccupied,
        "setEmpty":setEmpty
    }
};
export {Map}
