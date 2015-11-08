var knightPosition = [0, 0];
var observer = null;

function emitChange() {
  observer(knightPosition);
}

var observe = function(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

var moveKnight = function (toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}
