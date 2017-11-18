import {KeyboardInputModule} from "./keyboard.js";
import {createObservable, createTwoWayMapping, createNotifier} from "./observable.js";

export const ControlModule = (() => {
  const moveEvent = createObservable();

  if (annyang) {
    const commands = {
      "yo *x": ()=>console.log("yo")//createNotifier(moveEvent)
    };

    console.log("Commands been done added")
    annyang.addCommands(commands)
    // annyang.start();
  }
  else {
    console.log("Annyang failed to load properly.")
  }

  return {
    onMoveCommand: moveEvent.subscribe
  };
})();
