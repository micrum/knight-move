var PropTypes = React.PropTypes;
var CELL_COUNT = 100;

var Board = React.createClass({
  getInitialState: function() {
    return {
      currentScore: 0,
      currentTime: 0,
      user_uuid: null,
      game_uuid: null
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
    var gameOver = this.state.possibleMovesCount === 0;
    if(gameOver){
      this.stopTime();
    }
    return gameOver;
  },

  startTime: function() {
    var self = this;

    this.state.timer = setInterval(function() {
      self.setState({currentTime: self.state.currentTime + 1});
    }, 1000);

    return true;
  },

  stopTime: function() {
    clearInterval(this.state.timer);
  },

  renderPiece: function(key, x, y, knightOnCell) {
    var pieceClass = 'simpleCell',
        pieceMove = prevMoveIndex(x, y);

    if(knightOnCell) {
      pieceClass += ' currentState';
    } else {
      if(!pieceMove && canMoveKnight(x,y)) {
        this.state.possibleMovesCount += 1;
        pieceClass += ' possibleMove';
      }
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
    this.state.possibleMovesCount = 0;

    for(var i = 0; i < CELL_COUNT; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
        <div>
            <ProgressBar total={ CELL_COUNT }
                         currentScore={ this.state.currentScore }
                         currentTime={ this.state.currentTime }>
            </ProgressBar>
            <GameOverPopup time={ this.state.currentTime }
                           score={ this.state.currentScore }
                           total={ CELL_COUNT }
                           opened={ this.isGameOver() }>
            </GameOverPopup>
            <div style = {{ maxWidth: '640px', margin: '0 auto', padding: '15px' }}>
                { squares }
            </div>
        </div>
    );
  },

  handleSquareClick: function(x, y) {
    if (isFirstStep()){
      this.startTime();
      this.state.user_uuid = getUserUUID();
      this.state.game_uuid = getGameUUID();
    }
    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
    }
  }
});
