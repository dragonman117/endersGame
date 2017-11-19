////////////////////////////////////////////////////
//                    Helpers
////////////////////////////////////////////////////
export function createTwoWayMapping(pairs) {
  return pairs.reduce((mp, pair) => {
    mp[pair[0]] = pair[1];
    mp[pair[1]] = pair[0];
    return mp;
  }, {});
}


export function createNotifier(observable) {
  observable.notifySubscribers();
}

export function createObservable() {
  const observers = [];
  return {
    subscribe: (handler) => {
      observers.push(handler);
    },
    notifySubscribers: (data) => {
      observers.forEach((handler) => {
        handler(data);
      });
    }
  }
}
