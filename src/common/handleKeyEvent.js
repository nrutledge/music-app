export const handleKeyEvent = (callback, isKeyUp, key) => {
    return (e) => {
      if (e) {
        if (e.repeat) { return; }
        if (e.key) { key = e.key ;}
      }
      callback(key, isKeyUp);
    }
}