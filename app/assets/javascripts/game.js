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

var prevMoveIndex = function(x, y) {
  var index = knightPositions.indexOf(x + ',' + y);
  return (index > -1 ? index + 1 : null);
}

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

var isFirstStep = function() {
  return (knightPositions.length == 1);
};


//----------- API ------------

function createGame() {
  var deferred = $.Deferred();
  var url = '/games';

  $.post(url, function (result) {

    if (!result || !result['game_uuid']) {
      return;
    }

    deferred.resolve(result['game_uuid']);
  });

  return deferred.promise();
}

var getGameUUID = function() {
  var uuid = $.cookie('game_uuid');
  if (typeof uuid == 'undefined') {
    createUser().done( function(data) {
      $.cookie('game_uuid', data);
      uuid = data;
    })
  }
  return uuid;
};
