import { UnitList } from "/js/objects/unitList.js"
import { Unit } from "/js/objects/unit.js"
import { Creep } from "/js/objects/creep.js"
import { CreepList } from "/js/objects/creepList.js"
import { ControlModule } from "/js/game/io/control.js"
import { Commands } from "/js/game/control.js"

let Model = function(){
    let that = {},
        command,
        unitList = [],
        creepList = [],
        towerList = [],
        logicalMap;


    that.initCommands = function () {
      ControlModule.onMoveCommand((data) => {
        let name = data.name;
        console.log(data);
        let position = logicalMap.gridToPixel(data.col + "" + data.row);
        console.log(position)
        command.move(
          {
            name: name,
            position: {
              x: position[0],
              y: position[1]
            }
          },
          unitList
        );
      });

      ControlModule.onSetUnitNameEvent((data) => {
          console.log(data);
        command.setName(
          {
            name: data.name,
            newName: data.newName
          },
          unitList
        );
      });

      ControlModule.onBuildEvent((data) => {
          console.log(data);
          let position = logicalMap.gridToPixel(data.col + "" + data.row);
          console.log(position)
          towerList = command.buildTower(
              {
                  tower: data.tower,
                  position: {
                      x: position[0],
                      y: position[1]
                  }
              },
              towerList
          );
          console.log(towerList)
      });

      ControlModule.onPlaceUnitEvent((data) => {
          console.log(data);
        let position = logicalMap.gridToPixel(data.col + "" + data.row);
        console.log(position)
        unitList = command.createUnit(
          {
            unit: data.unit,
            position: {
              x: position[0],
              y: position[1]
            },
              name: data.name
          },
          unitList
        );
        console.log(unitList)
      });



    };

    that.init = function(logicModel){
         command = Commands();
        logicalMap = logicModel;

        let myUnit = UnitList["scout"];
        myUnit.position = { x: 24.0 * 128 + 64, y: 2.0 * 128 + 64};
        myUnit.direction = { x: 1, y: 0};
        myUnit.unitName = "JOSH";

        unitList.push(Unit(myUnit));
        myUnit.direction = { x: 2, y: -1};
        myUnit.position = { x:24.0 * 128 +64, y: 3.0 * 128 + 64};
        myUnit.unitName = "TJ";

        unitList.push(Unit(myUnit));

        unitList[0].init();
        unitList[1].init();

        let myCreep = CreepList["scout"];
        creepList.push(Creep({creep: myCreep, position:{x:23.0 * 128 + 64, y: 22.0 * 128 + 64}, direction: {x: -1, y: -1}}))
        creepList[0].init();

        that.initCommands();
    }

    that.gameOver = function(){ return false; }

    that.update = function(elapsedTime){
        for(let i = 0; i < unitList.length; i++){
            unitList[i].update(elapsedTime)
        }
        for(let i = 0; i < creepList.length; i++){
            creepList[i].update(elapsedTime)
        }
    }

    that.render = function(elapsedTime){

    }

    return that;
}

export { Model };
