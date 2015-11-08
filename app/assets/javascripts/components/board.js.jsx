var PropTypes = React.PropTypes;
var CELL_COUNT = 64;

var Board = React.createClass({
  getInitialState: function() {
    return {
      gameTime: "2:15",
      currentScore: 63
    }; // fetch from props?
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

  renderSquare: function(i) {
    var x = i % 8,
        y = Math.floor(i / 8),
        knightX = this.props.knightPosition[0],
        knightY = this.props.knightPosition[1],
        piece = (x === knightX && y === knightY) ? <Knight /> : null;

    return (
      <div key={i} onClick={ this.handleSquareClick.bind(this, x, y) }
           style={{ width: '12.5%', paddingBottom: '12.5%', height: '0',
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
      <div style = {{ maxWidth: '512px', margin: '0 auto' }}>
        <ProgressBar total={ CELL_COUNT } current={ this.state.currentScore }></ProgressBar>
        <GameOverPopup time={ this.state.gameTime } score={ this.state.currentScore} total={ CELL_COUNT } opened={this.isGameOver()}></GameOverPopup>
        { squares }
      </div>
    );
  },

  handleSquareClick: function(x, y) {
    if (canMoveKnight(x, y)) {
      this.scoreUp();
      moveKnight(x, y);
    }
  },
});
