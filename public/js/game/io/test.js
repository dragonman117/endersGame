import {ControlModule} from "./control.js";
import {KeyboardInputModule} from "./keyboard.js";
import {SoundsModule} from "./sounds.js";

KeyboardInputModule.motivate.onStartTransmission(() => {
  annyang.start();
  console.log("m")
  SoundsModule.makeStatic();
});

KeyboardInputModule.motivate.onEndTransmission(() => {
  console.log("m STOP")
  annyang.abort();
});

ControlModule.onMoveCommand((data) => {
  console.log("On move ", JSON.stringify(data, null, 2));
});
