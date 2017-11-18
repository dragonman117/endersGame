import {ControlModule} from "./control.js";
import {KeyboardInputModule} from "./keyboard.js";

KeyboardInputModule.motivate.onStartTransmission(() => {
  annyang.start();
  console.log("m")
});

KeyboardInputModule.motivate.onEndTransmission(() => {
  console.log("m STOP")
  annyang.abort();
});

ControlModule.onMoveCommand((data) => {
  console.log("On move ", data)
});

console.log("hey")
