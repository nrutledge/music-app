/**
 * Configurable event handler for use with both key and mouse events.
 * Specify 'key' for mouse events so they can act as a keydown/keyup.
 */
export default (callback, isKeyUp, key) => {
    return e => {
      if (e) {
        if (e.repeat) { return; }
        if (e.key) { key = e.key ;}
      }
      callback(key, isKeyUp);
    }
}