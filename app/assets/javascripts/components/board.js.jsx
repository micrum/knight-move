var PropTypes = React.PropTypes;
var CELL_COUNT = 100;

var Board = React.createClass({
  getInitialState: function() {
    return {
      currentScore: 1,
      currentTime: 0,
      userUUID: null,
      gameUUID: null
    };
  },

  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  scoreUp: function(e){
    this.setState({currentScore: this.state.currentScore + 1});
    return true;
  },

  isGameOver: function(){
    return this.state.currentScore === CELL_COUNT; // TODO: add to condition - or can't move anymore
  },

  startTime: function() {
    var self = this;

    setInterval(function() {
      self.setState({currentTime: self.state.currentTime + 1});
    }, 1000);

    return true;
  },

  renderPiece: function(key, x, y, knightOnCell) {
    var pieceClass = 'simpleCell',
        pieceMove = prevMoveIndex(x, y);

    if(knightOnCell) {
      pieceClass += ' currentState';
    } else if (!pieceMove && canMoveKnight(x,y)) {
        pieceClass += ' possibleMove';
    } else if (pieceMove && !canMoveKnight(x,y)) {
        pieceClass += ' impossibleMove';
    }

    return (
      <div key={key} onClick={ this.handleSquareClick.bind(this, x, y) }
          className={ pieceClass }>
        { pieceMove }
      </div>
    );
  },

  renderSquare: function(i) {
    var x = i % 10,
        y = Math.floor(i / 10),
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1],
        knightOnCell = (x === knightX && y === knightY);

    return (
      this.renderPiece(i, x, y, knightOnCell)
    );
  },

  render: function() {
    var squares = [];

    for(var i = 0; i < CELL_COUNT; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
        <div>
            <ProgressBar total={ CELL_COUNT }
                         currentScore={ this.state.currentScore }
                         currentTime={ this.state.currentTime }>
            </ProgressBar>
            <GameOverPopup time={ this.state.gameTime }
                           score={ this.state.currentScore}
                           total={ CELL_COUNT }
                           opened={this.isGameOver()}>
            </GameOverPopup>
            <div style = {{ maxWidth: '640px', margin: '0 auto', padding: '15px' }}>
                { squares }
            </div>
        </div>
    );
  },

  handleSquareClick: function (x, y) {
    var self = this;
    if (isFirstStep()) {
      this.startTime();
      getUserUUID().done(function (uuid) {
        self.state.userUUID = uuid;
        setGameUUID().done(function (uuid) {
          self.state.gameUUID = uuid;
          self.moveKnightAndSave(x, y);
        });
      });
    }
    else {
      self.moveKnightAndSave(x, y);
    }

  },

  moveKnightAndSave: function (x, y) {
    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
      saveGame(this.state.userUUID, this.state.gameUUID, this.state.currentTime);
    }
  }
});
