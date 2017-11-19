import {Base} from "/js/game/base.js"
import {Unit} from "/js/objects/unit.js"
import {UnitList} from "/js/objects/unitList.js"
import {TowerList} from "/js/objects/towerList.js"

let Commands = function(){

    function getUnit(nickname, unitList){
        for(let i = 0; i < unitList.length; i++){
            let name = unitList[i].getName()
            console.log(name)
            if(name === nickname) return unitList[i];
        }
        // let idx = nickname.getIndexOf(" ");
        // if(idx > 0){
        //
        // }
        return null;
    }

    function setName(commandArgs, unitList){
        if(getUnit(commandArgs.newName, unitList) !== null) return false;
        let unit = getUnit(commandArgs.name, unitList);
        unit.setName(commandArgs.newName);
        return true;
    }

    function move(commandArgs, unitList){
        console.log(commandArgs)
        console.log(unitList)
        let unit = getUnit(commandArgs.name, unitList);
        unit.setDestination(commandArgs.position);
    }

    function buildTower(commandArgs, towerList){
        console.log(TowerList);
        console.log(commandArgs);
        let tow = TowerList[(commandArgs.tower).toLowerCase()]
        console.log(tow)
        tow.position = commandArgs.position;
        tow.direction = {x: 0, y: 1};
        tow.unitName = commandArgs.tower + " " + towerList.length;
        let tower = Base(tow)
        towerList.push(tower);
        towerList[towerList.length - 1].init();
        return towerList;
    }

    function createUnit(commandArgs, unitList){
        console.log(commandArgs);
        let myUnit = UnitList[(commandArgs.unit).toLowerCase()];
        myUnit.position = commandArgs.position;
        myUnit.direction = { x: 1, y: 0};
        myUnit.unitName = commandArgs.name;

        unitList.push(Unit(myUnit));
        unitList[unitList.length-1].init();
        return unitList;
    }

    return {
        move: move,
        createUnit: createUnit,
        setName: setName,
        buildTower: buildTower
    }

}

export {Commands}
