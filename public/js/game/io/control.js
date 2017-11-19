import {KeyboardInputModule} from "./keyboard.js";
import {createObservable, createTwoWayMapping, createNotifier} from "./observable.js";
import {WordParserModule} from "./word-parser.js";
import {SoundsModule} from "./sounds.js"

export const ControlModule = (() => {
  const moveUnitEvent = createObservable();
  const setUnitNameEvent = createObservable();
  const placeUnitEvent = createObservable();
  const buildEvent = createObservable();

  if (annyang) {
    const commands = {
      "*name go to :col :row": (name, col, row) => {
          console.log(name, col, row);
          col = WordParserModule.parseToCharacter(col.toUpperCase());
          if(col === undefined){
                SoundsModule.makeErrorSound();
              return;
          }
          SoundsModule.makeConfirmSound();
        moveUnitEvent.notifySubscribers({
          name: name.toUpperCase(),
          col: col.toUpperCase(),
          row: WordParserModule.parseToInteger(row.toLowerCase())
        });
      },
        "*name move to :col :row": (name, col, row) => {
            console.log(name, col, row);
            col = WordParserModule.parseToCharacter(col.toUpperCase());
            if(col === undefined) {
                SoundsModule.makeErrorSound();
                return;
            }
            SoundsModule.makeConfirmSound();
            moveUnitEvent.notifySubscribers({
                name: name.toUpperCase(),
                col: col.toUpperCase(),
                row: WordParserModule.parseToInteger(row.toLowerCase())
            });
        },
      "place *unit at :col :row call him :name": (unit, col, row, name) => {
          console.log(name, col, row);
          SoundsModule.makeConfirmSound()
        placeUnitEvent.notifySubscribers({
          unit: unit.toUpperCase(),
          row: WordParserModule.parseToInteger(row.toLowerCase()),
          col: WordParserModule.parseToCharacter(col.toUpperCase()),
            name: name.toUpperCase()
        });
      },
        "build *tower at :col :row": (tower, col, row) => {
            console.log(name, col, row);
            SoundsModule.makeConfirmSound()
            buildEvent.notifySubscribers({
                tower: tower.toUpperCase(),
                row: WordParserModule.parseToInteger(row.toLowerCase()),
                col: WordParserModule.parseToCharacter(col.toUpperCase())
            });
        },
      "Hey *name I'm going to call you *newName": (name, newName) => {

          SoundsModule.makeConfirmSound();
        setUnitNameEvent.notifySubscribers({
          name: name.toUpperCase(),
          newName: newName.toUpperCase()
        });
      }
    };

    annyang.addCommands(commands)
    // annyang.start();
  }
  else {
    console.log("Annyang failed to load properly.")
  }

  return {
    onMoveCommand: moveUnitEvent.subscribe,
    onSetUnitNameEvent: setUnitNameEvent.subscribe,
    onPlaceUnitEvent: placeUnitEvent.subscribe,
    onBuildEvent: buildEvent.subscribe
  };
})();
