import {createObservable, createTwoWayMapping} from "./observable.js";

export const KeyboardInputModule = (() => {
  const commandKeys = [
    ["command", 67],
    ["motivate", 77],
    /* #new-command add new commands here */
  ];

  const keyMap = createTwoWayMapping(commandKeys);

  function setKeyBinding(command, key) {
    if (keyMap[key] === undefined) {
      const oldKey = keyMap[command]
      delete keyMap[oldKey];
      keyMap[command] = key;
      keyMap[key] = command;
    }
    else {
      return false;
    }
  }

  const isPressed = commandKeys.reduce((mp, commandKey) => {
    mp[commandKey[0]] = false;
    return mp;
  }, {});

  const transmissionObservables = commandKeys.reduce((mp, commandKey) => {
    mp[commandKey[0]] = createTranmissionObservable();
    return mp;
  }, {});

  // transmission listeners
  document.addEventListener("keydown", (event) => {
    const command = keyMap[event.keyCode];
    if (command !== undefined && !isPressed[command]) {
      transmissionObservables[command].startTransmissionObservable.notifySubscribers();
      isPressed[command] = true;
    }
  });
  document.addEventListener("keyup", (event) => {
    const command = keyMap[event.keyCode];
    if (command !== undefined && isPressed[command]) {
      transmissionObservables[command].endTransmissionObservable.notifySubscribers();
      isPressed[command] = false;
    }
  });

  function createTranmissionObservable(letter) {
    return {
      startTransmissionObservable: createObservable(),
      endTransmissionObservable: createObservable()
    };
  }

  function createCommandEvent(command) {
    return {
      onStartTransmission: (handler) => {
        transmissionObservables[command].startTransmissionObservable.subscribe(handler);
      },
      onEndTransmission: (handler) => {
        transmissionObservables[command].endTransmissionObservable.subscribe(handler);
      }
    }
  }

  return {
    /**
    *  onStartTransmission => when motivate key is pressed (no repeats)
    *  onEndTransmission => when motivate key is released
    */
    motivate: createCommandEvent("motivate"),
    /**
    *  onStartTransmission => when motivate key is pressed (no repeats)
    *  onEndTransmission => when motivate key is released
    */
    command: createCommandEvent("command"),
    /* #new-command add new commands here */

    /**
    *  setKeyBinding(command, key)
    *  Bind the given key to the given command
    */
    setKeyBinding: setKeyBinding
  }
})();
