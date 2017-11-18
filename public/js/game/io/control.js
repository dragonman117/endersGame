import {KeyboardInputModule} from "./keyboard.js";
import {createObservable, createTwoWayMapping, createNotifier} from "./observable.js";
import {WordParserModule} from "./word-parser.js";

export const ControlModule = (() => {
  const moveUnitEvent = createObservable();

  if (annyang) {
    const commands = {
      "*name go to :col :row": (name, col, row) => {
        moveUnitEvent.notifySubscribers({
          name: name,
          col: col,
          row: WordParserModule.parseToInteger(row)
        });
      },
      "place *unit at :row :col": (unit, row, col) => {
        moveUnitEvent.notifySubscribers({
          unit: unit,
          row: row,
          col: col
        });
      },
      "Hey *name I'm going to call you *newName": (name, newName) => {
        moveUnitEvent.notifySubscribers({
          name,
          newName
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
    onMoveCommand: moveUnitEvent.subscribe
  };
})();
