import {KeyboardInputModule} from "./keyboard.js";
import {createObservable, createTwoWayMapping, createNotifier} from "./observable.js";
import {WordParserModule} from "./word-parser.js";

export const ControlModule = (() => {
  const moveUnitEvent = createObservable();
  const setUnitNameEvent = createObservable();
  const placeUnitEvent = createObservable();

  if (annyang) {
    const commands = {
      "*name go to :col :row": (name, col, row) => {
        moveUnitEvent.notifySubscribers({
          name: name.toUpperCase(),
          col: col.toUpperCase(),
          row: WordParserModule.parseToInteger(row.toLowerCase())
        });
      },
      "place *unit at :row :col": (unit, row, col) => {
        placeUnitEvent.notifySubscribers({
          unit: unit.toUpperCase(),
          row: row.toUpperCase(),
          col: col.toUpperCase()
        });
      },
      "Hey *name I'm going to call you *newName": (name, newName) => {
        setUnitNametEvent.notifySubscribers({
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
    onPlaceUnitEvent: placeUnitEvent.subscribe
  };
})();
