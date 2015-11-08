var knightPosition = [0, 0];
var knightPositions = ['0,0'];
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
};

var moveKnight = function(toX, toY) {
  knightPosition = [toX, toY];
  knightPositions.push(toX + ',' + toY);
  emitChange();
};

var canMoveKnight = function(toX, toY) {
  const x = knightPosition[0];
  const y = knightPosition[1];
  const dx = toX - x;
  const dy = toY - y;

  if (knightPositions.indexOf(toX + ',' + toY) > -1) {
    return false
  } else {
    return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
      (Math.abs(dx) === 1 && Math.abs(dy) === 2);
  }
};
