import { UnitList } from "/js/objects/unitList.js"
import { Unit } from "/js/objects/unit.js"
import { Creep } from "/js/objects/creep.js"
import { CreepList } from "/js/objects/creepList.js"
import { Commands} from "/js/game/control.js"

let Model = function(){
    let that = {},
        command,
        playerUnits = [],
        creeps = [],
        logicalMap;


    that.init = function(logicModel){
         command = Commands();
        logicalMap = logicModel;

        let myUnit = UnitList["scout"];
        myUnit.position = { x: 24.0 * 128 + 64, y: 2.0 * 128 + 64};
        myUnit.direction = { x: 1, y: 0};
        myUnit.unitName = "Josh";

        playerUnits.push(Unit(myUnit));
        myUnit.direction = { x: 2, y: -1};
        myUnit.position = { x:24.0 * 128 +64, y: 3.0 * 128 + 64};
        myUnit.unitName = "TJ";

        playerUnits.push(Unit(myUnit));

        playerUnits[0].init();
        playerUnits[1].init();

        let myCreep = CreepList["scout"];
        creeps.push(Creep({creep: myCreep, position:{x:23.0 * 128 + 64, y: 22.0 * 128 + 64}, direction: {x: -1, y: -1}}))
        creeps[0].init();
    }

    that.gameOver = function(){ return false; }

    that.update = function(elapsedTime){
        for(let i = 0; i < playerUnits.length; i++){
            playerUnits[i].update(elapsedTime)
        }
        for(let i = 0; i < creeps.length; i++){
            creeps[i].update(elapsedTime)
        }
    }

    that.render = function(elapsedTime){

    }

    return that;
}

export { Model };