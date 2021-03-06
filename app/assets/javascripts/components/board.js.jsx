var PropTypes = React.PropTypes;
var CELL_COUNT = 100;

var Board = React.createClass({
  getInitialState: function () {
    return {
      currentScore: 1,
      currentTime: 0,
      currentRank: 'over 9000',
      userUUID: null,
      gameUUID: null
    };
  },

  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  scoreUp: function (e) {
    this.setState({currentScore: this.state.currentScore + 1});
    return true;
  },

  isGameOver: function () {
    var gameOver = this.state.possibleMovesCount === 0;
    if (gameOver) {
      this.stopTime();
    }
    return gameOver;
  },

  startTime: function () {
    var self = this;

    this.state.timer = setInterval(function () {
      self.setState({currentTime: self.state.currentTime + 1});
    }, 1000);

    return true;
  },

  stopTime: function () {
    clearInterval(this.state.timer);
  },

  renderPiece: function (key, x, y, knightOnCell) {
    var pieceClass = 'simpleCell',
      pieceMove = prevMoveIndex(x, y);

    if (knightOnCell) {
      pieceClass += ' currentState';
    } else if (!pieceMove && canMoveKnight(x, y)) {
      this.state.possibleMovesCount = 1;
      pieceClass += ' possibleMove';
    } else if (pieceMove && !canMoveKnight(x, y)) {
      pieceClass += ' impossibleMove';
    }

    return (
        <div style={{ margin: '1px'}} key={key} onClick={ this.handleSquareClick.bind(this, x, y) }
             className={ pieceClass }>
            <span className="cellScore">{ pieceMove }</span>
        </div>
    );
  },

  renderSquare: function (i) {
    var x = i % 10,
      y = Math.floor(i / 10),
      knightX = this.props.knightPosition[0],
      knightY = this.props.knightPosition[1],
      knightOnCell = (x === knightX && y === knightY);

    return (
      this.renderPiece(i, x, y, knightOnCell)
    );
  },

  render: function () {
    var squares = [];
    this.state.possibleMovesCount = 0;

    for (var i = 0; i < CELL_COUNT; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div>
        <ProgressBar total={ CELL_COUNT }
                     currentScore={ this.state.currentScore }
                     currentTime={ this.state.currentTime }
                     currentRank={ this.state.currentRank}>
        </ProgressBar>
        {this.renderGameOver()}
        <div style={{ maxWidth: '660px', margin: '0 auto', padding: '40px 15px' }}> {/* 660px = 640 + 10*2*2px cell margin */}
          { squares }
        </div>
      </div>
    );
  },

  renderGameOver: function () {
    if (this.isGameOver()) {
      return (
        <GameOverPopup time={ this.state.currentTime }
                       score={ this.state.currentScore}
                       total={ CELL_COUNT }
                       opened={true}
                       currentRank={ this.state.currentRank}>
        </GameOverPopup>
      )
    }
    return null;
  },

  handleSquareClick: function (x, y) {
    var self = this;
    if (isFirstStep()) {
      this.startTime();
      getUserUUID().done(function (uuid) {
        self.state.userUUID = uuid;
        setGameUUID(uuid).done(function (game_uuid) {
          self.state.gameUUID = game_uuid;
          self.moveKnightAndSave(x, y);
        });
      });
    }
    else {
      self.moveKnightAndSave(x, y);
    }

  },

  moveKnightAndSave: function (x, y) {
    var self = this;

    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
      getPosition(this.state.gameUUID).done(function (position) {
        self.state.currentRank = position;
      });
      saveGame(this.state.userUUID, this.state.gameUUID, this.state.currentTime);
    }
  }
});
