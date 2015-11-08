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
    return this.state.currentScore === CELL_COUNT; // TODO: add to condition - or can't move anymore
  },

  startTime: function() {
    var self = this;

    setInterval(function() {
      self.setState({currentTime: self.state.currentTime + 1});
    }, 1000);

    return true;
  },

  renderSquare: function(i) {
    var x = i % 10,
        y = Math.floor(i / 10),
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1],
        piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i} onClick={ this.handleSquareClick.bind(this, x, y) }
           style={{ width: '10%', paddingBottom: '10%', height: '0',
                            maxWidth: '64px', float: 'left', backgroundColor: '#FFD428',
                            borderRadius: '50%' }}>
          { piece }
      </div>
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

  handleSquareClick: function(x, y) {
    if (isFirstStep()){
      this.startTime();
    }
    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
    }
  }
});
