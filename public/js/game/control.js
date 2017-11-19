import {Base} from "/js/game/base.js"
import {Unit} from "/js/objects/unit.js"

let Commands = function(){

    function getUnit(nickname, unitList){
        for(let i = 0; i < unitList.length; i++){
            if(unitList[i].getName() === nickname) return unitList[i];
        }
        return null;
    }

    function setName(commandArgs, unitList){
        if(getUnit(commandArgs.newName, unitList) !== null) return false;
        let unit = getUnit(commandArgs.name, unitList);
        unit.setName(commandArgs.newName);
        return true;
    }

    function move(commandArgs, unitList){
        let unit = getUnit(commandArgs.name, unitList);
        unit.setDestination(commandArgs.position);
    }

    function buildTower(commandArgs, towerList){
        let tow = towerList[commandArgs.name]
        tow.position = commandArgs.pos;
        tow.direction = {x: 0, y: 1};
        tow.unitName = commandArgs.name + " " + towerList.length;
        let tower = Base(tow)
        towerList.push(tower);
        return towerList;
    }

    function createUnit(commandArgs, unitList){
        let myUnit = UnitList[commandArgs.name];
        myUnit.position = commandArgs.position;
        myUnit.direction = { x: 1, y: 0};
        myUnit.unitName = commandArgs.name + " " + unitList.length;

        unitList.push(Unit(myUnit));
        return unitList;
    }

}

export {Commands}